<?php
// +----------------------------------------------------------------------
// | likeadmin快速开发前后端分离管理后台（PHP版）
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | gitee下载：https://gitee.com/likeshop_gitee/likeadmin
// | github下载：https://github.com/likeshop-github/likeadmin
// | 访问官网：https://www.likeadmin.cn
// | likeadmin团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeadminTeam
// +----------------------------------------------------------------------
namespace app\common\service\pay;

use Alipay\EasySDK\Kernel\Factory;
use Alipay\EasySDK\Kernel\Config;
use app\common\enum\PayEnum;
use app\common\enum\user\UserTerminalEnum;
use app\common\logic\PayNotifyLogic;
use app\common\model\member\MemberOrder;
use app\common\model\pay\PayConfig;
use app\common\model\recharge\RechargeOrder;
use think\facade\Log;

/**
 * 支付宝支付
 * Class AliPlsayService
 * @package app\common\server
 */
class AliPayService extends BasePayService
{

    /**
     * 用户客户端
     * @var
     */
    protected $terminal;

    /**
     * 支付实例
     * @var
     */
    protected $pay;

    /**
     * 初始化设置
     * AliPayService constructor.
     * @throws \Exception
     */
    public function __construct($terminal = null)
    {
        //设置用户终端
        $this->terminal = $terminal;
        //初始化支付配置
        Factory::setOptions($this->getOptions());
        $this->pay = Factory::payment();
    }


    /**
     * @notes 支付设置
     * @return Config
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2021/7/28 17:43
     */
    public function getOptions()
    {
        $config = (new PayConfig())->where(['pay_way' => PayEnum::ALI_PAY])->find();
        if (empty($config)) {
            throw new \Exception('请配置好支付设置');
        }
        $options = new Config();
        $options->protocol = 'https';
        $options->gatewayHost = 'openapi.alipay.com';
//        $options->gatewayHost = 'openapi.alipaydev.com'; //测试沙箱地址
        $options->signType = 'RSA2';
        $options->appId = $config['config']['app_id'] ?? '';
        // 应用私钥
        $options->merchantPrivateKey = $config['config']['private_key'] ?? '';
        //接口加签方式
        // 秘钥模式
        if ($config['config']['mode'] == 'normal_mode') {
            //支付宝公钥
            $options->alipayPublicKey = $config['config']['ali_public_key'] ?? '';
        }
        
        //证书模式
        if ($config['config']['mode'] == 'certificate') {
            //判断是否已经存在证书文件夹，不存在则新建
            if (!file_exists(app()->getRootPath() . 'runtime/certificate')) {
                mkdir(app()->getRootPath() . 'runtime/certificate', 0775, true);
            }
            //写入文件
            $publicCert = $config['config']['public_cert'] ?? '';
            $aliPublicCert = $config['config']['ali_public_cert'] ?? '';
            $aliRootCert = $config['config']['ali_root_cert'] ?? '';
            $publicCertPath = app()->getRootPath() . 'runtime/certificate/' . md5($publicCert) . '.crt';
            $aliPublicCertPath = app()->getRootPath() . 'runtime/certificate/' . md5($aliPublicCert) . '.crt';
            $aliRootCertPath = app()->getRootPath() . 'runtime/certificate/' . md5($aliRootCert) . '.crt';
            if (!file_exists($publicCertPath)) {
                $fopenPublicCertPath = fopen($publicCertPath, 'w');
                fwrite($fopenPublicCertPath, $publicCert);
                fclose($fopenPublicCertPath);
            }
            if (!file_exists($aliPublicCertPath)) {
                $fopenAliPublicCertPath = fopen($aliPublicCertPath, 'w');
                fwrite($fopenAliPublicCertPath, $aliPublicCert);
                fclose($fopenAliPublicCertPath);
            }
            if (!file_exists($aliRootCertPath)) {
                $fopenAliRootCertPath = fopen($aliRootCertPath, 'w');
                fwrite($fopenAliRootCertPath, $aliRootCert);
                fclose($fopenAliRootCertPath);
            }
            //应用公钥证书路径
            $options->merchantCertPath = $publicCertPath;
            //支付宝公钥证书路径
            $options->alipayCertPath = $aliPublicCertPath;
            //支付宝根证书路径
            $options->alipayRootCertPath = $aliRootCertPath;
        }
        //回调地址
        $options->notifyUrl = (string)url('pay/aliNotify', [], false, true);
        return $options;
    }


    /**
     * @notes 支付
     * @param $from //订单来源;order-商品订单;recharge-充值订单
     * @param $order //订单信息
     * @return false|string[]
     * @author 段誉
     * @date 2021/8/13 17:08
     */
    public function pay($from, $order): array|bool
    {
        try {
            $result = match ($this->terminal) {
                UserTerminalEnum::PC => $this->pagePay($from, $order),
                UserTerminalEnum::IOS, UserTerminalEnum::ANDROID => $this->appPay($from, $order),
                UserTerminalEnum::WECHAT_OA, UserTerminalEnum::H5 => $this->wapPay($from, $order),
                default => throw new \Exception('支付方式错误'),
            };
            return [
                'config' => $result,
                'pay_way' => PayEnum::ALI_PAY
            ];
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * Notes: 支付回调
     * @param $data
     * @return bool
     * @author 段誉(2021/3/22 17:22)
     */
    public function notify($data)
    {
        try {
            $verify = $this->pay->common()->verifyNotify($data);
            if (false === $verify) {
                throw new \Exception('异步通知验签失败');
            }
            if (!in_array($data['trade_status'], ['TRADE_SUCCESS', 'TRADE_FINISHED'])) {
                return true;
            }
            $extra['transaction_id'] = $data['trade_no'];
            //验证订单是否已支付
            switch ($data['passback_params']) {
                case 'recharge':
                    $order = RechargeOrder::where(['sn' => $data['out_trade_no']])->findOrEmpty();
                    if ($order->isEmpty() || $order->pay_status == PayEnum::ISPAID) {
                        return true;
                    }
                    PayNotifyLogic::handle('recharge', $data['out_trade_no'], $extra);
                    break;
            }

            return true;
        } catch (\Exception $e) {
            $record = [
                __CLASS__,
                __FUNCTION__,
                $e->getFile(),
                $e->getLine(),
                $e->getMessage()
            ];
            Log::write(implode('-', $record));
            $this->setError($e->getMessage());
            return false;
        }
    }

    /**
     * @notes PC支付
     * @param $attach //附加参数(在回调时会返回)
     * @param $order //订单信息
     * @return string
     * @author 段誉
     * @date 2021/7/28 17:34
     */
    public function pagePay($attach, $order)
    {
        $domain = request()->domain();
        $result = $this->pay->page()->optional('passback_params', $attach)->pay(
            '订单:' . $order['sn'],
            $order['sn'],
            $order['order_amount'],
            $domain . $order['redirect_url']
        );
        return $result->body;
    }

    /**
     * @notes APP支付
     * @param $attach //附加参数(在回调时会返回)
     * @param $order //订单信息
     * @return string
     * @author 段誉
     * @date 2021/7/28 17:34
     */
    public function appPay($attach, $order)
    {
        $result = $this->pay->app()->optional('passback_params', $attach)->pay(
            $order['sn'],
            $order['sn'],
            $order['order_amount']
        );
        return $result->body;
    }

    /**
     * @notes 手机网页支付
     * @param $attach //附加参数(在回调时会返回)
     * @param $order //订单信息
     * @return string
     * @author 段誉
     * @date 2021/7/28 17:34
     */
    public function wapPay($attach, $order)
    {
        $domain = request()->domain();
        $url = $domain . '/mobile' . $order['redirect_url'] .'?id=' . $order['id'] . '&from='. $attach . '&checkPay=true';;
        $result = $this->pay->wap()->optional('passback_params', $attach)->pay(
            '订单:' . $order['sn'],
            $order['sn'],
            $order['order_amount'],
            $url,
            $url
        );
        return $result->body;
    }

    /**
     * @notes 查询订单
     * @param $orderSn
     * @return \Alipay\EasySDK\Payment\Common\Models\AlipayTradeQueryResponse
     * @throws \Exception
     * @author 段誉
     * @date 2021/7/28 17:36
     */
    public function checkPay($orderSn)
    {
        return $this->pay->common()->query($orderSn);
    }

    /**
     * @notes 退款
     * @param $orderSn
     * @param $orderAmount
     * @param $outRequestNo
     * @return \Alipay\EasySDK\Payment\Common\Models\AlipayTradeRefundResponse
     * @throws \Exception
     * @author 段誉
     * @date 2021/7/28 17:37
     */
    public function refund($orderSn, $orderAmount, $outRequestNo)
    {
        return $this->pay->common()->optional('out_request_no', $outRequestNo)->refund($orderSn, $orderAmount);
    }

    /**
     * @notes 查询退款
     * @author Tab
     * @date 2021/9/13 11:38
     */
    public function queryRefund($orderSn, $refundSn)
    {
        return $this->pay->common()->queryRefund($orderSn, $refundSn);
    }

    /**
     * @notes 捕获错误
     * @param $result
     * @throws \Exception
     * @author 段誉
     * @date 2023/2/28 12:09
     */
    public function checkResultFail($result)
    {
        if (isset($result['alipay_trade_precreate_response']['code']) && 10000 != $result['alipay_trade_precreate_response']['code']) {
            throw new \Exception('支付宝:' . $result['alipay_trade_precreate_response']['msg']);
        }
    }

    /**
     * @notes 转账到支付宝账号
     * @param $withdraw
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author ljj
     * @date 2023/10/9 10:58 上午
     */
    public function transfer($withdraw)
    {
        //请求参数
        $data = [
            'out_biz_no' => $withdraw['sn'],//商家侧唯一订单号，由商家自定义。对于不同转账请求，商家需保证该订单号在自身系统唯一。
            'trans_amount' => $withdraw['left_money'],//订单总金额，单位为元，不支持千位分隔符，精确到小数点后两位
            'product_code' => 'TRANS_ACCOUNT_NO_PWD',//销售产品码。单笔无密转账固定为 TRANS_ACCOUNT_NO_PWD。
            'biz_scene' => 'DIRECT_TRANSFER',//业务场景。单笔无密转账固定为 DIRECT_TRANSFER。
            'order_title' => '佣金提现',//转账业务的标题
            'payee_info' => [//收款方信息
                'identity' => $withdraw['account'],//参与方的标识 ID。当 identity_type=ALIPAY_USER_ID 时，填写支付宝用户 UID；当 identity_type=ALIPAY_LOGON_ID 时，填写支付宝登录号。
                'identity_type' => 'ALIPAY_LOGON_ID',//参与方的标识类型。ALIPAY_USER_ID：支付宝会员的用户 ID；ALIPAY_LOGON_ID：支付宝登录号；
                'name' => $withdraw['real_name'],//参与方真实姓名。如果非空，将校验收款支付宝账号姓名一致性。当 identity_type=ALIPAY_LOGON_ID 时，本字段必填。
            ],
            'remark' => '',//业务备注
        ];

        $result = Factory::util()->generic()->execute("alipay.fund.trans.uni.transfer", [], $data);
        $result = json_decode($result->httpBody, true);
        $result = $result['alipay_fund_trans_uni_transfer_response'] ?? [];
        if ($result['code'] != 10000) {//接口调用失败
            throw new \Exception($result['sub_msg'] ?? $result['msg']);
        }
        return $result;
    }

    /**
     * @notes 转账查询
     * @param $withdraw
     * @return mixed
     * @throws \Exception
     * @author ljj
     * @date 2023/10/9 11:47 上午
     */
    public function transferQuery($withdraw)
    {
        //请求参数
        $data = [
            'out_biz_no' => $withdraw['sn'],//商户转账唯一订单号：发起转账来源方定义的转账单据 ID。
            'product_code' => 'TRANS_ACCOUNT_NO_PWD',//销售产品码，如果传了 out_biz_no，则该字段必传。单笔无密转账固定为TRANS_ACCOUNT_NO_PWD。
            'biz_scene' => 'DIRECT_TRANSFER',//描述特定的业务场景，如果传递了out_biz_no 则该字段为必传。单笔无密转账固定为DIRECT_TRANSFER。
        ];

        $result = Factory::util()->generic()->execute("alipay.fund.trans.common.query", [], $data);
        $result = json_decode($result->httpBody, true);
        return $result['alipay_fund_trans_common_query_response'] ?? [];
    }
}


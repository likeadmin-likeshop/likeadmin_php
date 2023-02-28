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


use app\common\enum\PayEnum;
use app\common\enum\user\UserTerminalEnum;
use app\common\logic\PayNotifyLogic;
use app\common\model\recharge\RechargeOrder;
use app\common\model\user\UserAuth;
use app\common\service\wechat\WeChatConfigService;
use EasyWeChat\Pay\Application;
use EasyWeChat\Pay\Message;


/**
 * 微信支付
 * Class WeChatPayService
 * @package app\common\server
 */
class WeChatPayService extends BasePayService
{
    /**
     * 授权信息
     * @var UserAuth|array|\think\Model
     */
    protected $auth;


    /**
     * 微信配置
     * @var
     */
    protected $config;


    /**
     * easyWeChat实例
     * @var
     */
    protected $app;


    /**
     * 当前使用客户端
     * @var
     */
    protected $terminal;


    /**
     * 初始化微信支付配置
     * @param $terminal //用户终端
     * @param null $userId //用户id(获取授权openid)
     */
    public function __construct($terminal, $userId = null)
    {
        $this->terminal = $terminal;
        $this->config = WeChatConfigService::getPayConfigByTerminal($terminal);
        $this->app = new Application($this->config);
        if ($userId !== null) {
            $this->auth = UserAuth::where(['user_id' => $userId, 'terminal' => $terminal])->findOrEmpty();
        }
    }


    /**
     * @notes 发起微信支付统一下单
     * @param $from
     * @param $order
     * @return array|false|string
     * @author 段誉
     * @date 2021/8/4 15:05
     */
    public function pay($from, $order)
    {
        try {
            switch ($this->terminal) {
                case UserTerminalEnum::WECHAT_MMP:
                    $config = WeChatConfigService::getMnpConfig();
                    $result = $this->jsapiPay($from, $order, $config['app_id']);
                    break;
                case UserTerminalEnum::WECHAT_OA:
                    $config = WeChatConfigService::getOaConfig();
                    $result = $this->jsapiPay($from, $order, $config['app_id']);
                    break;
                case UserTerminalEnum::IOS:
                case UserTerminalEnum::ANDROID:
                    $config = WeChatConfigService::getOpConfig();
                    $result = $this->appPay($from, $order, $config['app_id']);
                    break;
                case UserTerminalEnum::H5:
                    $config = WeChatConfigService::getOaConfig();
                    $result = $this->mwebPay($from, $order, $config['app_id']);
                    break;
                case UserTerminalEnum::PC:
                    $config = WeChatConfigService::getOaConfig();
                    $result = $this->nativePay($from, $order, $config['app_id']);
                    break;
                default:
                    throw new \Exception('支付方式错误');
            }

            return [
                'config' => $result,
                'pay_way' => PayEnum::WECHAT_PAY
            ];
        } catch (\Exception $e) {
            $this->setError($e->getMessage());
            return false;
        }
    }


    /**
     * @notes jsapiPay
     * @param $from
     * @param $order
     * @param $appId
     * @return mixed
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @author 段誉
     * @date 2023/2/28 12:12
     */
    public function jsapiPay($from, $order, $appId)
    {
        $response = $this->app->getClient()->postJson("v3/pay/transactions/jsapi", [
            "appid" => $appId,
            "mchid" => $this->config['mch_id'],
            "description" => $this->payDesc($from),
            "out_trade_no" => $order['sn'],
            "notify_url" => $this->config['notify_url'],
            "amount" => [
                "total" => intval($order['order_amount'] * 100),
            ],
            "payer" => [
                "openid" => $this->auth['openid']
            ],
            'attach' => $from
        ]);

        $result = $response->toArray(false);
        $this->checkResultFail($result);
        return $this->getPrepayConfig($result['prepay_id'], $appId);
    }


    /**
     * @notes 网站native
     * @param $from
     * @param $order
     * @param $appId
     * @return mixed
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @author 段誉
     * @date 2023/2/28 12:12
     */
    public function nativePay($from, $order, $appId)
    {
        $response = $this->app->getClient()->postJson('v3/pay/transactions/native', [
            'appid' => $appId,
            'mchid' => $this->config['mch_id'],
            'description' => $this->payDesc($from),
            'out_trade_no' => $order['sn'],
            'notify_url' => $this->config['notify_url'],
            'amount' => [
                'total' => intval($order['order_amount'] * 100),
            ],
            'attach' => $from
        ]);
        $result = $response->toArray(false);
        $this->checkResultFail($result);
        return $result['code_url'];
    }


    /**
     * @notes appPay
     * @param $from
     * @param $order
     * @param $appId
     * @return mixed
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @author 段誉
     * @date 2023/2/28 12:12
     */
    public function appPay($from, $order, $appId)
    {
        $response = $this->app->getClient()->postJson('v3/pay/transactions/app', [
            'appid' => $appId,
            'mchid' => $this->config['mch_id'],
            'description' => $this->payDesc($from),
            'out_trade_no' => $order['sn'],
            'notify_url' => $this->config['notify_url'],
            'amount' => [
                'total' => intval($order['order_amount'] * 100),
            ],
            'attach' => $from
        ]);
        $result = $response->toArray(false);
        $this->checkResultFail($result);
        return $result['prepay_id'];
    }


    /**
     * @notes h5
     * @param $from
     * @param $order
     * @param $appId
     * @return mixed
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @author 段誉
     * @date 2023/2/28 12:13
     */
    public function mwebPay($from, $order, $appId)
    {
        $response = $this->app->getClient()->postJson('v3/pay/transactions/h5', [
            'appid' => $appId,
            'mchid' => $this->config['mch_id'],
            'description' => $this->payDesc($from),
            'out_trade_no' => $order['sn'],
            'notify_url' => $this->config['notify_url'],
            'amount' => [
                'total' => intval($order['order_amount'] * 100),
            ],
            'attach' => $from
        ]);
        $result = $response->toArray(false);
        $this->checkResultFail($result);
        return $result['h5_url'];
    }


    /**
     * @notes 退款
     * @param array $refundData
     * @return mixed
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @author 段誉
     * @date 2023/2/28 16:53
     */
    public function refund(array $refundData)
    {
        $response =  $this->app->getClient()->postJson('v3/refund/domestic/refunds', [
            'out_trade_no' => $refundData['transaction_id'],
            'out_refund_no' => $refundData['refund_sn'],
            'amount' => [
                'refund' => intval($refundData['refund_amount'] * 100),
                'total' => intval($refundData['total_amount'] * 100),
                'currency' => 'CNY',
            ]
        ]);

        $result = $response->toArray(false);
        $this->checkResultFail($result);
        return $result;
    }


    /**
     * @notes 支付描述
     * @param $from
     * @return string
     * @author 段誉
     * @date 2023/2/27 17:54
     */
    public function payDesc($from)
    {
        $desc = [
            'order' => '商品',
            'recharge' => '充值',
        ];
        return $desc[$from] ?? '商品';
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
        if (!empty($result['code']) || !empty($result['message'])) {
            throw new \Exception('微信支付:'. $result['code'] . '-' . $result['message']);
        }
    }


    /**
     * @notes 预支付配置
     * @param $prepayId
     * @param $appId
     * @return mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @author 段誉
     * @date 2023/2/28 17:38
     */
    public function getPrepayConfig($prepayId, $appId)
    {
        return $this->app->getUtils()->buildBridgeConfig($prepayId, $appId);
    }


    /**
     * @notes 支付回调
     * @return \Psr\Http\Message\ResponseInterface
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\RuntimeException
     * @throws \ReflectionException
     * @throws \Throwable
     * @author 段誉
     * @date 2023/2/28 14:20
     */
    public function notify()
    {
        $server = $this->app->getServer();
        // 支付通知
        $server->handlePaid(function (Message $message, \Closure $next) {
            if ($message['trade_state'] === 'SUCCESS') {
                $extra['transaction_id'] = $message['transaction_id'];
                $attach = $message['attach'];
                $message['out_trade_no'] = mb_substr($message['out_trade_no'], 0, 18);
                switch ($attach) {
                    case 'recharge':
                        $order = RechargeOrder::where(['sn' => $message['out_trade_no']])->findOrEmpty();
                        if($order->isEmpty() || $order->pay_status == PayEnum::ISPAID) {
                            return true;
                        }
                        PayNotifyLogic::handle('recharge', $message['out_trade_no'], $extra);
                        break;
                }
            }

            // $message->out_trade_no 获取商户订单号
            // $message->payer['openid'] 获取支付者 openid
            // 🚨🚨🚨 注意：推送信息不一定靠谱哈，请务必验证
            // 建议是拿订单号调用微信支付查询接口，以查询到的订单状态为准
            return $next($message);
        });

        // 退款通知
        $server->handleRefunded(function (Message $message, \Closure $next) {
            // $message->out_trade_no 获取商户订单号
            // $message->payer['openid'] 获取支付者 openid
            return $next($message);
        });

        return $server->serve();
    }




}
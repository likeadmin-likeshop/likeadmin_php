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

namespace app\api\validate;

use app\common\enum\PayEnum;
use app\common\service\ConfigService;
use app\common\validate\BaseValidate;

/**
 * 用户验证器
 * Class UserValidate
 * @package app\shopapi\validate
 */
class RechargeValidate extends BaseValidate
{

    protected $rule = [
        'pay_way' => 'require|checkPayWay',
        'money' => 'require|gt:0|checkMoney',
    ];


    protected $message = [
        'pay_way.require' => '请选择支付方式',
        'money.require' => '请填写充值金额',
        'money.gt' => '请填写大于0的充值金额',
    ];


    public function sceneRecharge()
    {
        return $this->only(['pay_way', 'money']);
    }


    /**
     * @notes 校验充值及支付方式
     * @param $payWay
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2023/2/24 10:39
     */
    protected function checkPayWay($payWay, $rule, $data)
    {
        $status = ConfigService::get('recharge', 'status', 0);
        if (!$status) {
            return '充值功能已关闭';
        }

        if (!in_array($payWay, [PayEnum::WECHAT_PAY, PayEnum::ALI_PAY])) {
            return '暂不支持当前支付方式';
        }

        return true;
    }


    /**
     * @notes 校验金额
     * @param $money
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2023/2/24 10:42
     */
    protected function checkMoney($money, $rule, $data)
    {
        $minAmount = ConfigService::get('recharge', 'min_amount', 0);

        if ($money < $minAmount) {
            return '最低充值金额' . $minAmount . "元";
        }

        return true;
    }

}
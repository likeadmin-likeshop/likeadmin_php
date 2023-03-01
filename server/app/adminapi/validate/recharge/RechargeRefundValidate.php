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

namespace app\adminapi\validate\recharge;


use app\common\enum\PayEnum;
use app\common\enum\RefundEnum;
use app\common\enum\YesNoEnum;
use app\common\model\recharge\RechargeOrder;
use app\common\model\refund\RefundRecord;
use app\common\model\user\User;
use app\common\validate\BaseValidate;

/**
 * 充值退款校验
 * Class RechargeRefundValidate
 * @package app\adminapi\validate\recharge
 */
class RechargeRefundValidate extends BaseValidate
{
    protected $rule = [
        'recharge_id' => 'require|checkRecharge',
        'record_id' => 'require|checkRecord',
    ];

    protected $message = [
        'recharge_id.require' => '参数缺失',
        'record_id.require' => '参数缺失',
    ];


    public function sceneRefund()
    {
        return $this->only(['recharge_id']);
    }


    public function sceneAgain()
    {
        return $this->only(['record_id']);
    }


    /**
     * @notes 校验充值订单能否发起退款
     * @param $rechargeId
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2023/2/28 17:00
     */
    protected function checkRecharge($rechargeId, $rule, $data)
    {
        $order = RechargeOrder::findOrEmpty($rechargeId);

        if ($order->isEmpty()) {
            return '充值订单不存在';
        }

        if ($order['pay_status'] != PayEnum::ISPAID) {
            return '当前订单不可退款';
        }

        // 校验订单是否已退款
        if ($order['refund_status'] == YesNoEnum::YES) {
            return '订单已发起退款,退款失败请到退款记录重新退款';
        }

        // 校验余额
        $user = User::findOrEmpty($order['user_id']);
        if ($user['user_money'] < $order['order_amount']) {
            return '退款失败:用户余额已不足退款金额';
        }

        return true;
    }


    /**
     * @notes 校验退款记录
     * @param $recordId
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2023/3/1 9:40
     */
    protected function checkRecord($recordId, $rule, $data)
    {
        $record = RefundRecord::findOrEmpty($recordId);
        if ($record->isEmpty()) {
            return '退款记录不存在';
        }

        if($record['refund_status'] == RefundEnum::REFUND_SUCCESS) {
            return '该退款记录已退款成功';
        }

        $order = RechargeOrder::findOrEmpty($record['order_id']);
        $user = User::findOrEmpty($record['user_id']);

        if ($user['user_money'] < $order['order_amount']) {
            return '退款失败:用户余额已不足退款金额';
        }

        return true;
    }

}
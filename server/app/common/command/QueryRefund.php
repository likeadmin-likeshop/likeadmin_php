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

namespace app\common\command;

use app\common\enum\PayEnum;
use app\common\enum\RefundEnum;
use app\common\model\recharge\RechargeOrder;
use app\common\model\refund\RefundLog;
use app\common\model\refund\RefundRecord;
use app\common\service\pay\WeChatPayService;
use think\console\Command;
use think\console\Input;
use think\console\Output;
use think\facade\Log;


class QueryRefund extends Command
{
    protected function configure()
    {
        $this->setName('query_refund')
            ->setDescription('订单退款状态处理');
    }


    protected function execute(Input $input, Output $output)
    {
        try {
            // 查找退款中的退款记录(微信，支付宝支付)
            $refundRecords = (new RefundLog())->alias('l')
                ->join('refund_record r', 'r.id = l.record_id')
                ->field([
                    'l.id' => 'log_id', 'l.sn' => 'log_sn',
                    'r.id' => 'record_id', 'r.order_id', 'r.sn' => 'record_sn', 'r.order_type'
                ])
                ->where(['l.refund_status' => RefundEnum::REFUND_ING])
                ->select()->toArray();

            if (empty($refundRecords)) {
                return false;
            }

            // 分别处理各个类型订单
            $rechargeRecords = array_filter($refundRecords, function ($item) {
                return $item['order_type'] == RefundEnum::ORDER_TYPE_RECHARGE;
            });

            if (!empty($rechargeRecords)) {
                $this->handleRechargeOrder($rechargeRecords);
            }

            return true;
        } catch (\Exception $e) {
            Log::write('订单退款状态查询失败,失败原因:' . $e->getMessage());
            return false;
        }
    }


    /**
     * @notes 处理充值订单
     * @param $refundRecords
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @author 段誉
     * @date 2023/3/1 15:55
     */
    public function handleRechargeOrder($refundRecords)
    {
        $orderIds = array_unique(array_column($refundRecords, 'order_id'));
        $Orders = RechargeOrder::whereIn('id', $orderIds)->column('*', 'id');

        foreach ($refundRecords as $record) {
            if (!isset($Orders[$record['order_id']])) {
                continue;
            }

            $order = $Orders[$record['order_id']];
            if (!in_array($order['pay_way'], [PayEnum::WECHAT_PAY, PayEnum::ALI_PAY])) {
                continue;
            }

            $this->checkReFundStatus([
                'record_id' => $record['record_id'],
                'log_id' => $record['log_id'],
                'log_sn' => $record['log_sn'],
                'pay_way' => $order['pay_way'],
                'order_terminal' => $order['order_terminal'],
            ]);
        }
    }


    /**
     * @notes 校验退款状态
     * @param $refundData
     * @return bool
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @author 段誉
     * @date 2023/3/1 15:54
     */
    public function checkReFundStatus($refundData)
    {
        $result = null;
        switch ($refundData['pay_way']) {
            case PayEnum::WECHAT_PAY:
                $result = self::checkWechatRefund($refundData['order_terminal'], $refundData['log_sn']);
                break;
        }

        if (is_null($result)) {
            return false;
        }

        if (true === $result) {
            $this->updateRefundSuccess($refundData['log_id'], $refundData['record_id']);
        } else {
            $this->updateRefundMsg($refundData['log_id'], $result);
        }
        return true;
    }


    /**
     * @notes 查询微信支付退款状态
     * @param $orderTerminal
     * @param $refundLogSn
     * @return bool|string|null
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @author 段誉
     * @date 2023/3/1 15:47
     */
    public function checkWechatRefund($orderTerminal, $refundLogSn)
    {
        // 根据商户退款单号查询退款
        $result = (new WeChatPayService($orderTerminal))->queryRefund($refundLogSn);

        if (!empty($result['status']) && $result['status'] == 'SUCCESS') {
            return true;
        }

        if (!empty($result['code']) || !empty($result['message'])) {
            return '微信:' . $result['code'] . '-' . $result['message'];
        }

        return null;
    }


    /**
     * @notes 更新记录为成功
     * @param $logId
     * @param $recordId
     * @author 段誉
     * @date 2023/3/1 15:38
     */
    public function updateRefundSuccess($logId, $recordId)
    {
        // 更新日志
        RefundLog::update([
            'id' => $logId,
            'refund_status' => RefundEnum::REFUND_SUCCESS,
        ]);
        // 更新记录
        RefundRecord::update([
            'id' => $recordId,
            'refund_status' => RefundEnum::REFUND_SUCCESS,
        ]);
    }


    /**
     * @notes 更新退款信息
     * @param $logId
     * @param $msg
     * @author 段誉
     * @date 2023/3/1 15:47
     */
    public function updateRefundMsg($logId, $msg)
    {
        // 更新日志
        RefundLog::update([
            'id' => $logId,
            'refund_msg' => $msg,
        ]);
    }

}
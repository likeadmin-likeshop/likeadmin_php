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

namespace app\adminapi\logic\finance;


use app\common\enum\RefundEnum;
use app\common\logic\BaseLogic;
use app\common\model\refund\RefundLog;
use app\common\model\refund\RefundRecord;


/**
 * 退款
 * Class RefundLogic
 * @package app\adminapi\logic\finance
 */
class RefundLogic extends BaseLogic
{

    /**
     * @notes 退款统计
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/3/3 12:09
     */
    public static function stat()
    {
        $records = RefundRecord::select()->toArray();

        $total = 0;
        $ing = 0;
        $success = 0;
        $error = 0;

        foreach ($records as $record) {
            $total += $record['order_amount'];
            switch ($record['refund_status']) {
                case RefundEnum::REFUND_ING:
                    $ing += $record['order_amount'];
                    break;
                case RefundEnum::REFUND_SUCCESS:
                    $success += $record['order_amount'];
                    break;
                case RefundEnum::REFUND_ERROR:
                    $error += $record['order_amount'];
                    break;
            }
        }

        return [
            'total' => round($total, 2),
            'ing' => round($ing, 2),
            'success' => round($success, 2),
            'error' => round($error, 2),
        ];
    }


    /**
     * @notes 退款日志
     * @param $recordId
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/3/3 14:25
     */
    public static function refundLog($recordId)
    {
        return (new RefundLog())
            ->order(['id' => 'desc'])
            ->where('record_id', $recordId)
            ->hidden(['refund_msg'])
            ->append(['handler', 'refund_status_text'])
            ->select()
            ->toArray();
    }

}
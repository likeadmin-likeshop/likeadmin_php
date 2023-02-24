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

namespace app\api\lists\recharge;

use app\api\lists\BaseApiDataLists;
use app\common\enum\PayEnum;
use app\common\model\recharge\RechargeOrder;


/**
 * 充值记录列表
 * Class RechargeLists
 * @package app\api\lists\recharge
 */
class RechargeLists extends BaseApiDataLists
{
    /**
     * @notes 获取列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/2/23 18:43
     */
    public function lists(): array
    {
        $lists = RechargeOrder::field('order_amount,create_time')
            ->where([
                'user_id' => $this->userId,
                'pay_status' => PayEnum::ISPAID
            ])
            ->order('id', 'desc')
            ->select()
            ->toArray();

        foreach($lists as &$item) {
            $item['tips'] = '充值' . format_amount($item['order_amount']) . '元';
        }

        return $lists;
    }


    /**
     * @notes  获取数量
     * @return int
     * @author 段誉
     * @date 2023/2/23 18:43
     */
    public function count(): int
    {
        return RechargeOrder::where([
                'user_id' => $this->userId,
                'pay_status' => PayEnum::ISPAID
            ])
            ->count();
    }

}
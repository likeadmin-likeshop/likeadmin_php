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

namespace app\adminapi\lists\setting\pay;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\model\pay\PayConfig;

/**
 * 支付配置列表
 * Class PayConfigLists
 * @package app\adminapi\lists\setting\pay
 */
class PayConfigLists extends BaseAdminDataLists
{

    /**
     * @notes 获取列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/2/23 16:15
     */
    public function lists(): array
    {
        $lists = PayConfig::field('id,name,pay_way,icon,sort')
            ->append(['pay_way_name'])
            ->order('sort','desc')
            ->select()
            ->toArray();

        return $lists;
    }


    /**
     * @notes 获取数量
     * @return int
     * @author 段誉
     * @date 2023/2/23 16:15
     */
    public function count(): int
    {
        return PayConfig::count();
    }



}
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

namespace app\adminapi\lists\decorate;


use app\adminapi\lists\BaseAdminDataLists;
use app\common\model\decorate\Navigation;

/**
 * 底部导航列表
 * Class NavigationLists
 * @package app\adminapi\lists\decorate
 */
class NavigationLists extends BaseAdminDataLists
{
    /**
     * @notes 底部导航列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author ljj
     * @date 2022/2/14 10:12 上午
     */
    public function lists(): array
    {
        return (new Navigation())->select()->toArray();
    }

    /**
     * @notes 底部导航总数
     * @return int
     * @author ljj
     * @date 2022/2/14 10:13 上午
     */
    public function count(): int
    {
        return (new Navigation())->count();
    }
}
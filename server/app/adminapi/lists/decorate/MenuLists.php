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
use app\common\enum\MenuEnum;
use app\common\model\decorate\Menu;

/**
 * 菜单列表
 * Class MenuLists
 * @package app\adminapi\lists\decorate
 */
class MenuLists extends BaseAdminDataLists
{
    /**
     * @notes 菜单列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author ljj
     * @date 2022/2/14 11:29 上午
     */
    public function lists(): array
    {
        $lists = (new Menu())->field('id,name,image,link_type,link_address,sort,status')
            ->order(['sort'=>'asc','id'=>'desc'])
            ->append(['link_address_desc','status_desc'])
            ->limit($this->limitOffset, $this->limitLength)
            ->select()
            ->toArray();

        foreach ($lists as &$list) {
            $list['link_address_desc'] = MenuEnum::getLinkDesc($list['link_type']).':'.$list['link_address_desc'];
        }

        return $lists;
    }

    /**
     * @notes 菜单总数
     * @return int
     * @author ljj
     * @date 2022/2/14 11:29 上午
     */
    public function count(): int
    {
        return (new Menu())->count();
    }
}
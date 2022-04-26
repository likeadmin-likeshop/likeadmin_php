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

namespace app\adminapi\lists\ad;


use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\model\ad\Ad;

/**
 * 广告列表
 * Class AdLists
 * @package app\adminapi\lists\ad
 */
class AdLists extends BaseAdminDataLists implements ListsSearchInterface
{
    /**
     * @notes 搜索条件
     * @return \string[][]
     * @author ljj
     * @date 2022/2/14 5:53 下午
     */
    public function setSearch(): array
    {
        return [
            '%like%' => ['name'],
            '=' => ['status','pid']
        ];
    }

    /**
     * @notes 广告列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author ljj
     * @date 2022/2/14 6:02 下午
     */
    public function lists(): array
    {
        $lists = (new Ad())->field('id,name,pid,image,link_type,link_address,sort,status')
            ->order(['sort'=>'asc','id'=>'desc'])
            ->append(['link_address_desc','ap_name'])
            ->where($this->searchWhere)
            ->limit($this->limitOffset,$this->limitLength)
            ->select()
            ->toArray();

        return $lists;
    }

    /**
     * @notes 广告总数
     * @return int
     * @author ljj
     * @date 2022/2/14 6:03 下午
     */
    public function count(): int
    {
        return (new Ad())->where($this->searchWhere)->count();
    }
}
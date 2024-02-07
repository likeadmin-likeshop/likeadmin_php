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

namespace app\adminapi\lists\file;


use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\model\file\FileCate;

/**
 * 文件分类列表
 * Class FileCateLists
 * @package app\adminapi\lists\file
 */
class FileCateLists extends BaseAdminDataLists implements ListsSearchInterface
{

    /**
     * @notes 文件分类搜素条件
     * @return \string[][]
     * @author 段誉
     * @date 2021/12/29 14:24
     */
    public function setSearch(): array
    {
        return [
            '=' => ['type']
        ];
    }


    /**
     * @notes 获取文件分类列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2021/12/29 14:24
     */
    public function lists(): array
    {
        $lists = (new FileCate())->field(['id,pid,type,name'])
            ->where($this->searchWhere)
            ->order('id desc')
            ->select()->toArray();

        return linear_to_tree($lists, 'children');
    }


    /**
     * @notes 获取文件分类数量
     * @return int
     * @author 段誉
     * @date 2021/12/29 14:24
     */
    public function count(): int
    {
        return (new FileCate())->where($this->searchWhere)->count();
    }
}
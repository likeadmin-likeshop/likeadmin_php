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

namespace app\adminapi\lists\tools;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\model\tools\GenerateTable;


/**
 * 代码生成所选数据表列表
 * Class GenerateTableLists
 * @package app\adminapi\lists\tools
 */
class GenerateTableLists extends BaseAdminDataLists implements ListsSearchInterface
{

    /**
     * @notes 设置搜索条件
     * @return \string[][]
     * @author 段誉
     * @date 2022/6/14 10:55
     */
    public function setSearch(): array
    {
        return [
            '%like%' => ['table_name', 'table_comment']
        ];
    }


    /**
     * @notes 查询列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/6/14 10:55
     */
    public function lists(): array
    {
        return GenerateTable::where($this->searchWhere)
            ->order(['id' => 'desc'])
            ->append(['template_type_desc'])
            ->limit($this->limitOffset, $this->limitLength)
            ->select()
            ->toArray();
    }


    /**
     * @notes 获取数量
     * @return int
     * @author 段誉
     * @date 2022/6/14 10:55
     */
    public function count(): int
    {
        return GenerateTable::count();
    }

}
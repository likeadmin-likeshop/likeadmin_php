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
use think\facade\Db;


/**
 * 数据表列表
 * Class GeneratorLists
 * @package app\adminapi\lists\tools
 */
class DataTableLists extends BaseAdminDataLists
{

    /**
     * @notes 查询结果
     * @return mixed
     * @author 段誉
     * @date 2022/6/13 18:54
     */
    public function queryResult()
    {
        $sql = 'SHOW TABLE STATUS WHERE 1=1 ';
        if (!empty($this->params['name'])) {
            $sql .= "AND name LIKE '%" . $this->params['name'] . "%'";
        }
        if (!empty($this->params['comment'])) {
            $sql .= "AND comment LIKE '%" . $this->params['comment'] . "%'";
        }
        return Db::query($sql);
    }


    /**
     * @notes 处理列表
     * @return array
     * @author 段誉
     * @date 2022/6/13 18:54
     */
    public function lists(): array
    {
        $lists = array_map("array_change_key_case", $this->queryResult());
        $offset = max(0, ($this->pageNo - 1) * $this->pageSize);
        $lists = array_slice($lists, $offset, $this->pageSize, true);
        return array_values($lists);
    }


    /**
     * @notes 获取数量
     * @return int
     * @author 段誉
     * @date 2022/6/13 18:54
     */
    public function count(): int
    {
        return count($this->queryResult());
    }

}
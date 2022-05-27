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

namespace app\adminapi\lists\dept;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\model\dept\Dept;

/**
 * 部门列表
 * Class DeptLists
 * @package app\adminapi\lists\dept
 */
class DeptLists extends BaseAdminDataLists implements ListsSearchInterface
{


    /**
     * @notes 设置搜索条件
     * @return \string[][]
     * @author 段誉
     * @date 2022/5/25 17:57
     */
    public function setSearch(): array
    {
        return [
            '%like%' => ['name'],
            '=' => ['status']
        ];
    }


    /**
     * @notes 部门列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/5/25 17:57
     */
    public function lists(): array
    {
        $lists = Dept::where($this->searchWhere)
            ->append(['status_desc'])
            ->limit($this->limitOffset, $this->limitLength)
            ->order(['sort' => 'desc', 'id' => 'desc'])
            ->select()
            ->toArray();

        $pid = 0;
        if (!empty($lists)) {
            $pid = min(array_column($lists, 'pid'));
        }

        return $this->getTree($lists, $pid);
    }


    /**
     * @notes 树状结构
     * @param $array
     * @param int $pid
     * @param int $level
     * @return array
     * @author 段誉
     * @date 2022/5/26 15:17
     */
    public function getTree($array, $pid = 0, $level = 0)
    {
        $list = [];
        foreach ($array as $key => $item) {
            if ($item['pid'] == $pid) {
                $item['level'] = $level;
                $item['children'] = $this->getTree($array, $item['id'], $level + 1);
                $list[] = $item;
            }
        }
        return $list;
    }


    /**
     * @notes 获取数量
     * @return int
     * @author 段誉
     * @date 2022/5/25 17:57
     */
    public function count(): int
    {
        return Dept::where($this->searchWhere)->count();
    }

}
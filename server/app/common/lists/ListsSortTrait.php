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


namespace app\common\lists;


trait ListsSortTrait
{

    protected string $orderBy;
    protected string $field;

    /**
     * @notes 生成排序条件
     * @param $sortField
     * @param $defaultOrder
     * @return array|string[]
     * @author 令狐冲
     * @date 2021/7/16 00:06
     */
    private function createOrder($sortField, $defaultOrder)
    {
        if (empty($sortField) || empty($this->orderBy) || empty($this->field) || !in_array($this->field, array_keys($sortField))) {
            return $defaultOrder;
        }

        if (isset($sortField[$this->field])) {
            $field = $sortField[$this->field];
        } else {
            return $defaultOrder;
        }

        if ($this->orderBy == 'desc') {
            return [$field => 'desc'];
        }
        if ($this->orderBy == 'asc') {
            return [$field => 'asc'];
        }
        return $defaultOrder;
    }
}
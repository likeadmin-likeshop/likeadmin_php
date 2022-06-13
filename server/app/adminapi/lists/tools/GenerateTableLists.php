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


/**
 * 选择生成代码的数据表列表
 * Class GenerateTableLists
 * @package app\adminapi\lists\tools
 */
class GenerateTableLists extends BaseAdminDataLists implements ListsSearchInterface
{

    public function setSearch(): array
    {
        return [
            '=' => ['name', 'comment']
        ];
    }


    public function lists(): array
    {
        return [];
    }

    public function count(): int
    {
        return 1;
    }

}
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

namespace app\adminapi\controller\tools;

use app\adminapi\controller\BaseAdminController;
use app\adminapi\lists\tools\DataTableLists;
use app\adminapi\lists\tools\GenerateTableLists;

/**
 * 代码生成器控制器
 * Class GeneratorController
 * @package app\adminapi\controller\article
 */
class GeneratorController extends BaseAdminController
{

    // 数据库中数据表列表
    public function dataTable()
    {
        return $this->dataLists(new DataTableLists());
    }


    // 已选择的数据表列表
    public function generateTable()
    {
        return $this->dataLists(new GenerateTableLists());
    }






}
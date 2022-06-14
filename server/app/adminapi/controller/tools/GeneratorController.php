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
use app\adminapi\logic\tools\GeneratorLogic;

/**
 * 代码生成器控制器
 * Class GeneratorController
 * @package app\adminapi\controller\article
 */
class GeneratorController extends BaseAdminController
{

    /**
     * @notes 获取数据库中所有数据表信息
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/6/14 10:57
     */
    public function dataTable()
    {
        return $this->dataLists(new DataTableLists());
    }


    /**
     * @notes 获取已选择的数据表
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/6/14 10:57
     */
    public function generateTable()
    {
        return $this->dataLists(new GenerateTableLists());
    }


    // 选择数据表
    public function selectTable()
    {
//        $params = (new ArticleValidate())->post()->goCheck('add');
        $params = input();
        GeneratorLogic::selectTable($params);
        return $this->success('添加成功', [], 1, 1);
    }


    // 预览
    public function preview()
    {

    }


    // 生成代码
    public function generateCode()
    {

    }

    // 同步代码
    public function syncCode()
    {
    }


    // 编辑信息
    public function edit()
    {

    }


    // 详情
    public function detail()
    {

    }

    // 删除
    public function delete()
    {

    }


}
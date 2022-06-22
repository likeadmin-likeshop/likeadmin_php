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

namespace app\common\service\generator;


use app\common\service\generator\core\ControllerGenerator;
use app\common\service\generator\core\ListsGenerator;
use app\common\service\generator\core\LogicGenerator;
use app\common\service\generator\core\ModelGenerator;
use app\common\service\generator\core\ValidateGenerator;
use app\common\service\generator\core\VueApiGenerator;

class GenerateService
{

    public function generateBefore()
    {
        // 校验文件夹是否存在
    }


    // 生成文件
    public function generate(array $tableData)
    {
        // 设置控制器信息
        $controllerGenerator = new ControllerGenerator();
        $controllerGenerator->setGenerateData($tableData);
        $controllerGenerator->generate();
        // 生成列表文件
        $listsGenerator = new ListsGenerator();
        $listsGenerator->setGenerateData($tableData);
        $listsGenerator->generate();
        // 生成模型文件
        $modelGenerator = new ModelGenerator();
        $modelGenerator->setGenerateData($tableData);
        $modelGenerator->generate();
        // 生成验证器文件
        $validateGenerator = new ValidateGenerator();
        $validateGenerator->setGenerateData($tableData);
        $validateGenerator->generate();
        // 生成逻辑文件
        $logicGenerator = new LogicGenerator();
        $logicGenerator->setGenerateData($tableData);
        $logicGenerator->generate();

        // vue-api
        $vueApiGenerator = new VueApiGenerator();
        $vueApiGenerator->setGenerateData($tableData);
        $vueApiGenerator->generate();
    }


    // 预览文件
    public function preview()
    {

    }

}
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
use app\common\service\generator\core\VueEditGenerator;
use app\common\service\generator\core\VueIndexGenerator;

class GenerateService
{

    // 设置生成状态
    public function setGenerateStatus()
    {

    }


    // 删除生成状态
    public function delGenerateStatus()
    {

    }


    public function getGeneratorClass()
    {
        return [
            ControllerGenerator::class,
            ListsGenerator::class,
            ModelGenerator::class,
            ValidateGenerator::class,
            LogicGenerator::class,
            VueApiGenerator::class,
            VueIndexGenerator::class,
            VueEditGenerator::class,
        ];
    }


    // 生成文件
    public function generate(array $tableData)
    {
        foreach ($this->getGeneratorClass() as $item) {
            $generator = app()->make($item);
            $generator->initGenerateData($tableData);
            $generator->generate();
        }
    }


    // 预览文件
    public function preview(array $tableData)
    {
        $data = [];
        foreach ($this->getGeneratorClass() as $item) {
            $generator = app()->make($item);
            $generator->initGenerateData($tableData);
            $data[] = $generator->fileInfo();
        }
        return $data;
    }

}
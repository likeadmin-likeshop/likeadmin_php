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

declare(strict_types=1);

namespace app\common\service\generator\core;


class ControllerGenerator extends BaseGenerator implements GenerateInterface
{

    // 表信息
    protected $tableData;

    // 文件内容
    protected $content;

    // 设置当前表信息
    public function setTableData($tableData)
    {
        // 设置当前表信息
        $this->tableData = $tableData;

        // 替换模板变量
        $this->replaceVariables();
    }


    public function setContent($content)
    {
        $this->content = $content;
    }

    public function getTemplatePath()
    {
        return $this->templateDir . 'controller/Controller.stub';
    }


    // 替换变量
    public function replaceVariables()
    {
        // 需要替换的变量
        $needReplace = [];
        // 等待替换的内容
        $waitReplace = [];

        // 替换内容
        $this->setContent(str_replace(
            $needReplace,
            $waitReplace,
            $this->getTemplatePath()
        ));
    }


    // 生成文件
    public function generate()
    {

    }


    // 预览文件
    public function preview()
    {
    }


}
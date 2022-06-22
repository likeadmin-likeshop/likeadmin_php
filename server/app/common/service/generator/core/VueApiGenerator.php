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


/**
 * vue-api生成器
 * Class VueApiGenerator
 * @package app\common\service\generator\core
 */
class VueApiGenerator extends BaseGenerator implements GenerateInterface
{

    // 设置生成数据
    public function setGenerateData($tableData)
    {
        // 设置当前表信息
        $this->setTableData($tableData);

        // 设置模块名
        $this->setModuleName($tableData['module_name']);

        // 设置类目录
        $this->setClassDir($tableData['class_dir'] ?? '');

        // 替换模板变量
        $this->replaceVariables();
    }


    // 替换变量
    public function replaceVariables()
    {
        // 需要替换的变量
        $needReplace = [
            '{COMMENT}',
            '{UPPER_CAMEL_NAME}',
            '{ROUTE}'
        ];

        // 等待替换的内容
        $waitReplace = [
            $this->getCommentContent(),
            $this->getUpperCamelName(),
            $this->getRouteContent(),
        ];

        $templatePath = $this->getTemplatePath('vue_api');

        // 替换内容
        $content = str_replace($needReplace, $waitReplace, file_get_contents($templatePath));

        $this->setContent($content);
    }


    // 表描述
    public function getCommentContent()
    {
        return $this->tableData['table_comment'];
    }


    // 路由名称
    public function getRouteContent()
    {
        $content = $this->getTableName();
        if (!empty($this->classDir)) {
            $content = $this->classDir . '.' . $this->getTableName();
        }
        return $content;
    }


    // 目标模块下的生成文件文件夹 (生成到模块时使用)
    public function getModuleGenerateDir()
    {
        $dir = dirname(app()->getRootPath());
        dd($dir);
//        $dir = $this->basePath . $this->moduleName . '/controller/';
//        if (!empty($this->classDir)) {
//            $dir .= $this->classDir . '/';
//            $this->checkDir($dir);
//        }
//        return $dir;
    }


    // runtime目录下的生成文件文件夹 (压缩包下载时使用)
    public function getRuntimeGenerateDir()
    {
        $dir = $this->generatorDir . 'vue/src/api/';
        $this->checkDir($dir);
        return $dir;
    }


    // 生成的文件名
    public function getGenerateName()
    {
        return $this->getTableName() . '.ts';
    }


    // 生成文件
    public function generate()
    {
        //生成方式  0-压缩包下载 1-生成到模块
        if ($this->tableData['generate_type']) {
            // 生成路径
            $path = $this->getModuleGenerateDir() . $this->getGenerateName();
            // 如文件已存在，则增加后续
            if (file_exists($path)) {
                $path .= '_' . time();
            }
        } else {
            // 生成到runtime目录
            $path = $this->getRuntimeGenerateDir() . $this->getGenerateName();
        }

        // 写入内容
        file_put_contents($path, $this->content);
    }


    // 预览文件
    public function preview()
    {
    }


}
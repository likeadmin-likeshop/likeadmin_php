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
 * 模型生成器
 * Class ModelGenerator
 * @package app\common\service\generator\core
 */
class ModelGenerator extends BaseGenerator implements GenerateInterface
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
            '{NAMESPACE}',
            '{CLASS_COMMENT}',
            '{UPPER_CAMEL_NAME}',
            '{PACKAGE_NAME}',
        ];

        // 等待替换的内容
        $waitReplace = [
            $this->getNameSpaceContent(),
            $this->getClassCommentContent(),
            $this->getUpperCamelName(),
            $this->getPackageNameContent(),
        ];

        $templatePath = $this->getTemplatePath('model');

        // 替换内容
        $content = str_replace($needReplace, $waitReplace, file_get_contents($templatePath));

        $this->setContent($content);
    }


    // 获取命名空间模板内容
    public function getNameSpaceContent()
    {
        if (!empty($this->classDir)) {
            return "namespace app\\common\\model\\" . $this->classDir . ';';
        }
        return "namespace app\\common\\lists;";
    }


    // 获取类描述
    public function getClassCommentContent()
    {
        if (!empty($this->tableData['class_comment'])) {
            $tpl = $this->tableData['class_comment'] . '模型';
        } else {
            $tpl = $this->getUpperCamelName() . '模型';
        }
        return $tpl;
    }


    // 获取包名
    public function getPackageNameContent()
    {
        return !empty($this->classDir) ? '\\' . $this->classDir : '';
    }


    // 目标模块下的生成文件文件夹 (生成到模块时使用)
    public function getModuleGenerateDir()
    {
        $dir = $this->basePath . $this->moduleName . '/model/';
        if (!empty($this->classDir)) {
            $dir .= $this->classDir . '/';
            $this->checkDir($dir);
        }
        return $dir;
    }


    // runtime目录下的生成文件文件夹 (压缩包下载时使用)
    public function getRuntimeGenerateDir()
    {
        $dir = $this->generatorDir . 'common/model/';
        $this->checkDir($dir);
        if (!empty($this->classDir)) {
            $dir = $this->generatorDir . 'common/model/'. $this->classDir . '/';
            $this->checkDir($dir);
        }
        return $dir;
    }


    // 生成的文件名
    public function getGenerateName()
    {
        return $this->getUpperCamelName() . '.php';
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

        return true;
    }


    // 预览文件
    public function preview()
    {
    }


}
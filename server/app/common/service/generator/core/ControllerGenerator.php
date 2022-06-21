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
            '{USE}',
            '{CLASS_COMMENT}',
            '{UPPER_CAMEL_NAME}',
            '{MODULE_NAME}',
            '{PACKAGE_NAME}',
            '{EXTENDS_CONTROLLER}'
        ];

        // 等待替换的内容
        $waitReplace = [
            $this->getNameSpaceContent(),
            $this->getUseContent(),
            $this->getClassCommentContent(),
            $this->getUpperCamelName(),
            $this->moduleName,
            $this->getPackageNameContent(),
            $this->getExtendsControllerContent(),
        ];

        $templatePath = $this->getTemplatePath('controller');

        // 替换内容
        $content = str_replace($needReplace, $waitReplace, file_get_contents($templatePath));

        $this->setContent($content);
    }


    // 获取命名空间模板内容
    public function getNameSpaceContent()
    {
        if (!empty($this->classDir)) {
            return "namespace app\\" . $this->moduleName . "\\controller\\" . $this->classDir . ';';
        }
        return "namespace app\\" . $this->moduleName . "\\controller;";
    }


    // 获取use模板内容
    public function getUseContent()
    {
        if ($this->moduleName == 'adminapi') {
            $tpl = "use app\\" . $this->moduleName . "\\controller\\BaseAdminController;" . PHP_EOL;
        } else {
            $tpl = "use app\\common\\controller\\BaseLikeAdminController;" . PHP_EOL;
        }

        if (!empty($this->classDir)) {
            $tpl .= "use app\\" . $this->moduleName . "\\lists\\" . $this->classDir . "\\" . $this->getUpperCamelName() . "Lists;" . PHP_EOL .
                "use app\\" . $this->moduleName . "\\logic\\" . $this->classDir . "\\" . $this->getUpperCamelName() . "Logic;" . PHP_EOL .
                "use app\\" . $this->moduleName . "\\validate\\" . $this->classDir . "\\" . $this->getUpperCamelName() . "Validate;";
        } else {
            $tpl .= "use app\\" . $this->moduleName . "\\lists\\" . $this->getUpperCamelName() . "Lists;" . PHP_EOL .
                "use app\\" . $this->moduleName . "\\logic\\" . $this->getUpperCamelName() . "Logic;" . PHP_EOL .
                "use app\\" . $this->moduleName . "\\validate\\" . $this->getUpperCamelName() . "Validate;";
        }

        return $tpl;
    }


    // 获取类描述
    public function getClassCommentContent()
    {
        if (!empty($this->tableData['class_comment'])) {
            $tpl = $this->tableData['class_comment'] . '控制器';
        } else {
            $tpl = $this->getUpperCamelName() . '控制器';
        }
        return $tpl;
    }


    // 获取包名
    public function getPackageNameContent()
    {
        return !empty($this->classDir) ? '\\' . $this->classDir : '';
    }


    // 获取继承控制器
    public function getExtendsControllerContent()
    {
        $tpl = 'BaseAdminController';
        if ($this->moduleName != 'adminapi') {
            $tpl = 'BaseLikeAdminController';
        }
        return $tpl;
    }


    // 目标模块下的生成文件文件夹 (生成到模块时使用)
    public function getModuleGenerateDir()
    {
        $dir = $this->basePath . $this->moduleName . '/controller/';
        if (!empty($this->classDir)) {
            $dir .= $this->classDir . '/';
            $this->checkDir($dir);
        }
        return $dir;
    }


    // runtime目录下的生成文件文件夹 (压缩包下载时使用)
    public function getRuntimeGenerateDir()
    {
        $dir = $this->generatorDir;
        if (!empty($this->classDir)) {
            $dir = $this->generatorDir . $this->classDir . '/controller/';
            $this->checkDir($dir);
        }
        return $dir;
    }


    // 生成的文件名
    public function getGenerateName()
    {
        return $this->getUpperCamelName() . 'Controller.php';
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
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
 * 控制器生成器
 * Class ControllerGenerator
 * @package app\common\service\generator\core
 */
class ControllerGenerator extends BaseGenerator implements GenerateInterface
{

    /**
     * @notes 替换变量
     * @return mixed|void
     * @author 段誉
     * @date 2022/6/22 18:09
     */
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
            '{EXTENDS_CONTROLLER}',
            '{NOTES}',
            '{AUTHOR}',
            '{DATE}'
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
            $this->tableData['class_comment'],
            $this->getAuthorContent(),
            $this->getNoteDateContent(),
        ];

        $templatePath = $this->getTemplatePath('php/controller');

        // 替换内容
        $content = $this->replaceFileData($needReplace, $waitReplace, $templatePath);

        $this->setContent($content);
    }


    /**
     * @notes 获取命名空间内容
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:10
     */
    public function getNameSpaceContent()
    {
        if (!empty($this->classDir)) {
            return "namespace app\\" . $this->moduleName . "\\controller\\" . $this->classDir . ';';
        }
        return "namespace app\\" . $this->moduleName . "\\controller;";
    }


    /**
     * @notes 获取use模板内容
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:10
     */
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


    /**
     * @notes 获取类描述内容
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:10
     */
    public function getClassCommentContent()
    {
        if (!empty($this->tableData['class_comment'])) {
            $tpl = $this->tableData['class_comment'] . '控制器';
        } else {
            $tpl = $this->getUpperCamelName() . '控制器';
        }
        return $tpl;
    }


    /**
     * @notes 获取包名
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:10
     */
    public function getPackageNameContent()
    {
        return !empty($this->classDir) ? '\\' . $this->classDir : '';
    }


    /**
     * @notes 获取继承控制器
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:10
     */
    public function getExtendsControllerContent()
    {
        $tpl = 'BaseAdminController';
        if ($this->moduleName != 'adminapi') {
            $tpl = 'BaseLikeAdminController';
        }
        return $tpl;
    }


    /**
     * @notes 获取文件生成到模块的文件夹路径
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:10
     */
    public function getModuleGenerateDir()
    {
        $dir = $this->basePath . $this->moduleName . '/controller/';
        if (!empty($this->classDir)) {
            $dir .= $this->classDir . '/';
            $this->checkDir($dir);
        }
        return $dir;
    }


    /**
     * @notes 获取文件生成到runtime的文件夹路径
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:11
     */
    public function getRuntimeGenerateDir()
    {
        $dir = $this->generatorDir . 'php/app/' . $this->moduleName . '/controller/';
        $this->checkDir($dir);
        if (!empty($this->classDir)) {
            $dir .= $this->classDir . '/';
            $this->checkDir($dir);
        }
        return $dir;
    }


    /**
     * @notes 生成文件名
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:11
     */
    public function getGenerateName()
    {
        return $this->getUpperCamelName() . 'Controller.php';
    }


    /**
     * @notes 文件信息
     * @return array
     * @author 段誉
     * @date 2022/6/23 15:57
     */
    public function fileInfo(): array
    {
        return [
            'name' => $this->getGenerateName(),
            'type' => 'php',
            'content' => $this->content
        ];
    }

}
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
 * 验证器生成器
 * Class ValidateGenerator
 * @package app\common\service\generator\core
 */
class ValidateGenerator extends BaseGenerator implements GenerateInterface
{


    /**
     * @notes 替换变量
     * @return mixed|void
     * @author 段誉
     * @date 2022/6/22 18:18
     */
    public function replaceVariables()
    {
        // 需要替换的变量
        $needReplace = [
            '{NAMESPACE}',
            '{CLASS_COMMENT}',
            '{UPPER_CAMEL_NAME}',
            '{MODULE_NAME}',
            '{PACKAGE_NAME}',
            '{PK}',
            '{RULE}',
            '{NOTES}',
            '{AUTHOR}',
            '{DATE}'
        ];

        // 等待替换的内容
        $waitReplace = [
            $this->getNameSpaceContent(),
            $this->getClassCommentContent(),
            $this->getUpperCamelName(),
            $this->moduleName,
            $this->getPackageNameContent(),
            $this->getPkContent(),
            $this->getRuleContent(),
            $this->tableData['class_comment'],
            $this->getAuthorContent(),
            $this->getNoteDateContent(),
        ];

        $templatePath = $this->getTemplatePath('validate');

        // 替换内容
        $content = $this->replaceFileData($needReplace, $waitReplace, $templatePath);

        $this->setContent($content);
    }


    /**
     * @notes 验证规则
     * @return mixed|string
     * @author 段誉
     * @date 2022/6/22 18:18
     */
    public function getRuleContent()
    {
        $content = "'" . $this->getPkContent() . "' => 'require'," . PHP_EOL;
        foreach ($this->tableColumn as $column) {
            if ($column['is_required'] == 1) {
                $content .= "'" . $column['column_name'] . "' => 'require'," . PHP_EOL;
            }
        }
        $content = substr($content, 0, -2);
        return $this->setBlankSpace($content, "        ");
    }


    /**
     * @notes 获取命名空间模板内容
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:18
     */
    public function getNameSpaceContent()
    {
        if (!empty($this->classDir)) {
            return "namespace app\\" . $this->moduleName . "\\validate\\" . $this->classDir . ';';
        }
        return "namespace app\\" . $this->moduleName . "\\validate;";
    }


    /**
     * @notes 获取类描述
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:18
     */
    public function getClassCommentContent()
    {
        if (!empty($this->tableData['class_comment'])) {
            $tpl = $this->tableData['class_comment'] . '验证器';
        } else {
            $tpl = $this->getUpperCamelName() . '验证器';
        }
        return $tpl;
    }


    /**
     * @notes 获取包名
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:18
     */
    public function getPackageNameContent()
    {
        return !empty($this->classDir) ? '\\' . $this->classDir : '';
    }


    /**
     * @notes 获取文件生成到模块的文件夹路径
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:18
     */
    public function getModuleGenerateDir()
    {
        $dir = $this->basePath . $this->moduleName . '/validate/';
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
     * @date 2022/6/22 18:18
     */
    public function getRuntimeGenerateDir()
    {
        $dir = $this->generatorDir . 'php/app/' . $this->moduleName . '/validate/';
        $this->checkDir($dir);
        if (!empty($this->classDir)) {
            $dir .= $this->classDir . '/';
            $this->checkDir($dir);
        }
        return $dir;
    }


    /**
     * @notes 生成的文件名
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:19
     */
    public function getGenerateName()
    {
        return $this->getUpperCamelName() . 'Validate.php';
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
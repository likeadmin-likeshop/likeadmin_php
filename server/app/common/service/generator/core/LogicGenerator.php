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
 * 逻辑生成器
 * Class LogicGenerator
 * @package app\common\service\generator\core
 */
class LogicGenerator extends BaseGenerator implements GenerateInterface
{

    /**
     * @notes 替换变量
     * @return mixed|void
     * @author 段誉
     * @date 2022/6/22 18:14
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
            '{PK}',
            '{CREATE_DATA}',
            '{UPDATE_DATA}',
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
            $this->getPkContent(),
            $this->getCreateDataContent(),
            $this->getUpdateDataContent(),
            $this->tableData['class_comment'],
            $this->getAuthorContent(),
            $this->getNoteDateContent(),
        ];

        $templatePath = $this->getTemplatePath('php/logic');

        // 替换内容
        $content = $this->replaceFileData($needReplace, $waitReplace, $templatePath);

        $this->setContent($content);
    }


    /**
     * @notes 添加内容
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:14
     */
    public function getCreateDataContent()
    {
        $content = '';
        foreach ($this->tableColumn as $column) {
            if (!$column['is_insert']) {
                continue;
            }
            $content .= $this->addEditColumn($column);
        }
        if (empty($content)) {
            return $content;
        }
        $content = substr($content, 0, -2);
        return $this->setBlankSpace($content, "                ");
    }


    /**
     * @notes 编辑内容
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:14
     */
    public function getUpdateDataContent()
    {
        $columnContent = '';
        foreach ($this->tableColumn as $column) {
            if (!$column['is_update']) {
                continue;
            }
            $columnContent .= $this->addEditColumn($column);
        }

        if (empty($columnContent)) {
            return $columnContent;
        }

        $columnContent = substr($columnContent, 0, -2);
        $content = $columnContent;
        return $this->setBlankSpace($content, "                ");
    }


    /**
     * @notes 添加编辑字段内容
     * @param $column
     * @return mixed
     * @author 段誉
     * @date 2022/6/27 15:37
     */
    public function addEditColumn($column)
    {
        if ($column['column_type'] == 'int' && $column['view_type'] == 'datetime') {
            // 物理类型为int，显示类型选择日期的情况
            $content = "'" . $column['column_name'] . "' => " . 'strtotime($params[' . "'" . $column['column_name'] . "'" . ']),' . PHP_EOL;
        } else {
            $content = "'" . $column['column_name'] . "' => " . '$params[' . "'" . $column['column_name'] . "'" . '],' . PHP_EOL;
        }
        return $content;
    }


    /**
     * @notes 获取命名空间内容
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:14
     */
    public function getNameSpaceContent()
    {
        if (!empty($this->classDir)) {
            return "namespace app\\" . $this->moduleName . "\\logic\\" . $this->classDir . ';';
        }
        return "namespace app\\" . $this->moduleName . "\\logic;";
    }


    /**
     * @notes 获取use内容
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:14
     */
    public function getUseContent()
    {
        $tpl = "use app\\common\\model\\" . $this->getUpperCamelName() . ';';
        if (!empty($this->classDir)) {
            $tpl = "use app\\common\\model\\" . $this->classDir . "\\" . $this->getUpperCamelName() . ';';
        }
        return $tpl;
    }


    /**
     * @notes 获取类描述
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:14
     */
    public function getClassCommentContent()
    {
        if (!empty($this->tableData['class_comment'])) {
            $tpl = $this->tableData['class_comment'] . '逻辑';
        } else {
            $tpl = $this->getUpperCamelName() . '逻辑';
        }
        return $tpl;
    }


    /**
     * @notes 获取包名
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:14
     */
    public function getPackageNameContent()
    {
        return !empty($this->classDir) ? '\\' . $this->classDir : '';
    }


    /**
     * @notes 获取文件生成到模块的文件夹路径
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:15
     */
    public function getModuleGenerateDir()
    {
        $dir = $this->basePath . $this->moduleName . '/logic/';
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
     * @date 2022/6/22 18:15
     */
    public function getRuntimeGenerateDir()
    {
        $dir = $this->generatorDir . 'php/app/' . $this->moduleName . '/logic/';
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
     * @date 2022/6/22 18:15
     */
    public function getGenerateName()
    {
        return $this->getUpperCamelName() . 'Logic.php';
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
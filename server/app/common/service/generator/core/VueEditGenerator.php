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


use app\common\enum\GeneratorEnum;

/**
 * vue-edit生成器
 * Class VueEditGenerator
 * @package app\common\service\generator\core
 */
class VueEditGenerator extends BaseGenerator implements GenerateInterface
{

    /**
     * @notes 替换变量
     * @return mixed|void
     * @author 段誉
     * @date 2022/6/22 18:19
     */
    public function replaceVariables()
    {
        // 需要替换的变量
        $needReplace = [
            '{FORM_VIEW}',
            '{UPPER_CAMEL_NAME}',
            '{DICT_DATA}',
            '{DICT_DATA_API}',
            '{FORM_DATA}',
            '{FORM_VALIDATE}',
            '{TABLE_COMMENT}',
            '{PK}',
            '{API_DIR}',
            '{CHECKBOX_JOIN}',
            '{CHECKBOX_SPLIT}',
            '{FORM_DATE}',
            '{SETUP_NAME}',
            '{IMPORT_LISTS}',
            '{TREE_CONST}',
            '{GET_TREE_LISTS}'
        ];

        // 等待替换的内容
        $waitReplace = [
            $this->getFormViewContent(),
            $this->getUpperCamelName(),
            $this->getDictDataContent(),
            $this->getDictDataApiContent(),
            $this->getFormDataContent(),
            $this->getFormValidateContent(),
            $this->tableData['table_comment'],
            $this->getPkContent(),
            $this->getTableName(),
            $this->getCheckBoxJoinContent(),
            $this->getCheckBoxSplitContent(),
            $this->getFormDateContent(),
            $this->getLowerCamelName(),
            $this->getImportListsContent(),
            $this->getTreeConstContent(),
            $this->getTreeListsContent(),
        ];

        $templatePath = $this->getTemplatePath('vue/edit');

        // 替换内容
        $content = $this->replaceFileData($needReplace, $waitReplace, $templatePath);

        $this->setContent($content);
    }


    /**
     * @notes 复选框处理
     * @return string
     * @author 段誉
     * @date 2022/6/24 19:30
     */
    public function getCheckBoxJoinContent()
    {
        $content = '';
        foreach ($this->tableColumn as $column) {
            if (empty($column['view_type']) || $column['is_pk']) {
                continue;
            }
            if ($column['view_type'] != 'checkbox') {
                continue;
            }
            $content .= $column['column_name'] . ': formData.' . $column['column_name'] . '.join(",")' . PHP_EOL;
        }
        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }
        return $content;
    }


    /**
     * @notes 复选框处理
     * @return string
     * @author 段誉
     * @date 2022/6/24 19:30
     */
    public function getCheckBoxSplitContent()
    {
        $content = '';
        foreach ($this->tableColumn as $column) {
            if (empty($column['view_type']) || $column['is_pk']) {
                continue;
            }
            if ($column['view_type'] != 'checkbox') {
                continue;
            }
            $content .= '//@ts-ignore' . PHP_EOL;
            $content .= 'data.' . $column['column_name'] . ' && ' .'(formData.' . $column['column_name'] . ' = String(data.' . $column['column_name'] . ').split(","))' . PHP_EOL;
        }
        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '    ');
    }


    /**
     * @notes 树表contst
     * @return string
     * @author 段誉
     * @date 2022/12/22 18:19
     */
    public function getTreeConstContent()
    {
        $content = "";
        if ($this->isTreeCrud()) {
            $content = file_get_contents($this->getTemplatePath('vue/other_item/editTreeConst'));
        }
        return $content;
    }


    /**
     * @notes 获取树表列表
     * @return string
     * @author 段誉
     * @date 2022/12/22 18:26
     */
    public function getTreeListsContent()
    {
        $content = '';
        if (!$this->isTreeCrud()) {
            return $content;
        }

        $needReplace = [
            '{TREE_ID}',
            '{TREE_NAME}',
            '{UPPER_CAMEL_NAME}',
        ];
        $waitReplace = [
            $this->treeConfig['tree_id'],
            $this->treeConfig['tree_name'],
            $this->getUpperCamelName(),
        ];

        $templatePath =  $this->getTemplatePath('vue/other_item/editTreeLists');
        if (file_exists($templatePath)) {
            $content = $this->replaceFileData($needReplace, $waitReplace, $templatePath);
        }

        return $content;
    }


    /**
     * @notes 表单日期处理
     * @return string
     * @author 段誉
     * @date 2022/6/27 16:45
     */
    public function getFormDateContent()
    {
        $content = '';
        foreach ($this->tableColumn as $column) {
            if (empty($column['view_type']) || $column['is_pk']) {
                continue;
            }
            if ($column['view_type'] != 'datetime' || $column['column_type'] != 'int') {
                continue;
            }
            $content .= '//@ts-ignore' . PHP_EOL;
            $content .= 'formData.' . $column['column_name'] . ' = timeFormat(formData.' . $column['column_name'] . ','."'yyyy-mm-dd hh:MM:ss'".') ' . PHP_EOL;
        }
        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '    ');
    }


    /**
     * @notes 获取表单内容
     * @return string
     * @author 段誉
     * @date 2022/6/23 11:57
     */
    public function getFormViewContent()
    {
        $content = '';
        foreach ($this->tableColumn as $column) {
            if (!$column['is_insert'] || !$column['is_update'] || $column['is_pk']) {
                continue;
            }
            $needReplace = [
                '{COLUMN_COMMENT}',
                '{COLUMN_NAME}',
                '{DICT_TYPE}',
            ];
            $waitReplace = [
                $column['column_comment'],
                $column['column_name'],
                $column['dict_type'],
            ];

            $viewType = $column['view_type'];
            // 树表，树状结构下拉框
            if ($this->isTreeCrud() && $column['column_name'] == $this->treeConfig['tree_pid']) {
                $viewType = 'treeSelect';
                array_push($needReplace, '{TREE_ID}', '{TREE_NAME}');
                array_push($waitReplace, $this->treeConfig['tree_id'], $this->treeConfig['tree_name']);
            }

            $templatePath = $this->getTemplatePath('vue/form_item/' . $viewType);
            if (!file_exists($templatePath)) {
                continue;
            }

            // 单选框值处理
            if ($column['view_type'] == 'radio' || $column['view_type'] == 'select') {
                $stubItemValue = 'item.value';
                $intFieldValue = ['tinyint', 'smallint', 'mediumint', 'int', 'integer', 'bigint'];
                if (in_array($column['column_type'], $intFieldValue)) {
                    $stubItemValue = 'parseInt(item.value)';
                }
                array_push($needReplace, '{ITEM_VALUE}');
                array_push($waitReplace, $stubItemValue);
            }

            $content .= $this->replaceFileData($needReplace, $waitReplace, $templatePath) . PHP_EOL;
        }

        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }

        $content = $this->setBlankSpace($content, '                ');
        return $content;
    }


    /**
     * @notes 获取字典数据内容
     * @return string
     * @author 段誉
     * @date 2022/6/23 11:58
     */
    public function getDictDataContent()
    {
        $content = '';
        $isExist = [];
        foreach ($this->tableColumn as $column) {
            if (empty($column['dict_type']) || $column['is_pk']) {
                continue;
            }
            if (in_array($column['dict_type'], $isExist)) {
                continue;
            }
            $content .= $column['dict_type'] . ': ' . "[]," . PHP_EOL;
            $isExist[] = $column['dict_type'];
        }
        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '    ');
    }


    /**
     * @notes 获取字典数据api内容
     * @return false|string
     * @author 段誉
     * @date 2022/6/23 11:58
     */
    public function getDictDataApiContent()
    {
        $content = '';
        $isExist = [];
        foreach ($this->tableColumn as $column) {
            if (empty($column['dict_type']) || $column['is_pk']) {
                continue;
            }
            if (in_array($column['dict_type'], $isExist)) {
                continue;
            }
            $needReplace = [
                '{UPPER_CAMEL_NAME}',
                '{DICT_TYPE}',
            ];
            $waitReplace = [
                $this->getUpperCamelName(),
                $column['dict_type'],
            ];
            $templatePath = $this->getTemplatePath('vue/other_item/dictDataApi');
            if (!file_exists($templatePath)) {
                continue;
            }
            $content .= $this->replaceFileData($needReplace, $waitReplace, $templatePath) . '' . PHP_EOL;

            $isExist[] = $column['dict_type'];
        }
        $content = substr($content, 0, -1);
        return $content;
    }


    /**
     * @notes 获取表单默认字段内容
     * @return string
     * @author 段誉
     * @date 2022/6/23 15:15
     */
    public function getFormDataContent()
    {
        $content = '';
        $isExist = [];
        foreach ($this->tableColumn as $column) {
            if (!$column['is_insert'] || !$column['is_update'] || $column['is_pk']) {
                continue;
            }
            if (in_array($column['column_name'], $isExist)) {
                continue;
            }

            // 复选框类型返回数组
            if ($column['view_type'] == 'checkbox') {
                $content .= $column['column_name'] . ': ' . "[]," . PHP_EOL;
            } else {
                $content .= $column['column_name'] . ': ' . "''," . PHP_EOL;
            }

            $isExist[] = $column['column_name'];
        }
        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '    ');
    }


    /**
     * @notes 表单验证内容
     * @return false|string
     * @author 段誉
     * @date 2022/6/23 15:16
     */
    public function getFormValidateContent()
    {
        $content = '';
        $isExist = [];
        $specDictType = ['input', 'textarea', 'editor'];

        foreach ($this->tableColumn as $column) {
            if (!$column['is_required'] || $column['is_pk']) {
                continue;
            }
            if (in_array($column['column_name'], $isExist)) {
                continue;
            }

            $validateMsg = in_array($column['view_type'], $specDictType) ? '请输入' : '请选择';
            $validateMsg .= $column['column_comment'];

            $needReplace = [
                '{COLUMN_NAME}',
                '{VALIDATE_MSG}',
            ];
            $waitReplace = [
                $column['column_name'],
                $validateMsg,
            ];
            $templatePath = $this->getTemplatePath('vue/other_item/formValidate');
            if (!file_exists($templatePath)) {
                continue;
            }

            $content .= $this->replaceFileData($needReplace, $waitReplace, $templatePath) . ',' . PHP_EOL;

            $isExist[] = $column['column_name'];
        }
        $content = substr($content, 0, -2);
        return $content;
    }


    /**
     * @notes 树表时导入列表
     * @author 段誉
     * @date 2022/12/23 9:56
     */
    public function getImportListsContent()
    {
        $content = "";
        if ($this->isTreeCrud()) {
            $content = "api". $this->getUpperCamelName(). 'Lists,';
        }

        if (empty($content)) {
            return $content;
        }

        return $this->setBlankSpace($content, ' ');
    }


    /**
     * @notes 获取文件生成到模块的文件夹路径
     * @return mixed|void
     * @author 段誉
     * @date 2022/6/22 18:19
     */
    public function getModuleGenerateDir()
    {
        $dir = dirname(app()->getRootPath()) . '/admin/src/views/' . $this->getTableName() . '/';
        $this->checkDir($dir);
        return $dir;
    }


    /**
     * @notes 获取文件生成到runtime的文件夹路径
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:20
     */
    public function getRuntimeGenerateDir()
    {
        $dir = $this->generatorDir . 'vue/src/views/' . $this->getTableName() . '/';
        $this->checkDir($dir);
        return $dir;
    }


    /**
     * @notes 生成的文件名
     * @return string
     * @author 段誉
     * @date 2022/6/22 18:20
     */
    public function getGenerateName()
    {
        return 'edit.vue';
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
            'type' => 'vue',
            'content' => $this->content
        ];
    }


}
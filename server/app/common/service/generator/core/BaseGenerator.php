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


use think\helper\Str;


abstract class BaseGenerator
{

    // 模板文件夹
    protected $templateDir;

    // 模块名
    protected $moduleName;

    // 类目录
    protected $classDir;

    // 表信息
    protected $tableData;

    // 表字段信息
    protected $tableColumn;

    // 文件内容
    protected $content;

    // 项目基础路径
    protected $basePath;

    // 项目
    protected $rootPath;

    // 文件生成文件夹
    protected $generatorDir;

    public function __construct()
    {
        $this->basePath = app()->getBasePath();
        $this->rootPath = app()->getRootPath();
        $this->templateDir = $this->basePath . 'common/service/generator/stub/';
        $this->generatorDir = $this->rootPath . 'runtime/generator/';
        $this->checkDir($this->generatorDir);
    }


    // 创建文件夹
    public function checkDir($path)
    {
        !is_dir($path) && mkdir($path, 0755, true);
    }


    // 设置表信息
    public function setTableData($tableData)
    {
        $this->tableData = $tableData;
        $this->tableColumn = $tableData['table_column'] ?? [];
    }

    // 设置模块名
    public function setModuleName(string $moduleName): void
    {
        $this->moduleName = strtolower($moduleName);
    }


    // 设置类目录
    public function setClassDir(string $classDir): void
    {
        $this->classDir = $classDir;
    }

    // 设置生成文件内容
    public function setContent(string $content): void
    {
        $this->content = $content;
    }


    // 获取模板路径
    public function getTemplatePath(string $templateName): string
    {
        return $this->templateDir . $templateName . '.stub';
    }


    // 小驼峰命名
    public function getLowerCamelName()
    {
        return Str::camel($this->getTableName());
    }


    // 大驼峰命名
    public function getUpperCamelName()
    {
        return Str::studly($this->getTableName());
    }


    // 获取表名
    public function getTableName()
    {
        $tablePrefix = config('database.connections.mysql.prefix');
        return str_replace($tablePrefix, '', $this->tableData['table_name']);
    }


    // 获取主键
    public function getPkContent()
    {
        $pk = 'id';
        if (empty($this->tableColumn)) {
            return $pk;
        }

        foreach ($this->tableColumn as $item) {
            if ($item['is_pk']) {
                $pk = $item['column_name'];
            }
        }
        return $pk;
    }


    // 设置空格占位
    public function setBlankSpace($content, $blankpace)
    {
        $content = explode(PHP_EOL, $content);
        foreach ($content as $line => $text) {
            $content[$line] = $blankpace . $text;
        }
        return (implode(PHP_EOL, $content));
    }

}
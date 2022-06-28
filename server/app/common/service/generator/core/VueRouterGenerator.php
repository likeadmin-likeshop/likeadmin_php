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
 * vue-router生成器
 * Class VueRouterGenerator
 * @package app\common\service\generator\core
 */
class VueRouterGenerator extends BaseGenerator implements GenerateInterface
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
            '{DIR_NAME}',
            '{TITLE}'
        ];

        // 等待替换的内容
        $waitReplace = [
            $this->getTableName(),
            $this->tableData['table_comment'],
        ];
        $templatePath = $this->getTemplatePath('vue_router');

        // 替换内容
        $content = $this->replaceFileData($needReplace, $waitReplace, $templatePath);

        $this->setContent($content);

    }


    /**
     * @notes 更新主路由文件
     * @author 段誉
     * @date 2022/6/27 19:02
     */
    public function updateMainRouter()
    {
        $mainRouter = dirname(app()->getRootPath()) . '/admin/src/router/index.ts';
        $needReplace = [
            '//{GENERATOR_IMPORT_TAG}',
            '//{GENERATOR_ROUTER_TAG}'
        ];
        $import = 'import ' . $this->getLowerCamelName() . " from './modules/" . $this->getTableName() . "'" . PHP_EOL;
        $router = $this->getLowerCamelName() . ',    // '. $this->tableData['table_comment'] . PHP_EOL;

        if ($this->checkContentIsExist($mainRouter, $import) || $this->checkContentIsExist($mainRouter, $router)) {
            return true;
        }

        $router .= '            //{GENERATOR_ROUTER_TAG}';
        $import .= "//{GENERATOR_IMPORT_TAG}";

        $waitReplace = [
            $import,
            $router
        ];
        $content = $this->replaceFileData($needReplace, $waitReplace, $mainRouter);
        // 写入内容
        file_put_contents($mainRouter, $content);
    }


    /**
     * @notes 内容是否已存在
     * @param $file
     * @param $content
     * @return bool
     * @author 段誉
     * @date 2022/6/28 9:42
     */
    public function checkContentIsExist($file, $content)
    {
        $fileContent = file_get_contents($file);
        $result = strstr($fileContent, $content);
        if (false === $result) {
            return false;
        }
        return true;
    }


    /**
     * @notes 获取文件生成到模块的文件夹路径
     * @return mixed|void
     * @author 段誉
     * @date 2022/6/22 18:19
     */
    public function getModuleGenerateDir()
    {
        $dir = dirname(app()->getRootPath()) . '/admin/src/router/modules/';
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
        $dir = $this->generatorDir . 'vue/src/router/modules/';
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
        return $this->getTableName() . '.ts';
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
            'type' => 'ts',
            'content' => $this->content
        ];
    }


}
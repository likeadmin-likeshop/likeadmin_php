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

namespace app\common\service\generator;


use app\common\service\generator\core\ControllerGenerator;
use app\common\service\generator\core\ListsGenerator;
use app\common\service\generator\core\LogicGenerator;
use app\common\service\generator\core\ModelGenerator;
use app\common\service\generator\core\ValidateGenerator;
use app\common\service\generator\core\VueApiGenerator;
use app\common\service\generator\core\VueEditGenerator;
use app\common\service\generator\core\VueIndexGenerator;

class GenerateService
{

    // 标记
    protected $flag;

    // 删除生成文件夹内容
    public function delGenerateDirContent()
    {
        // 删除runtime目录制定文件夹
        $path = root_path() . 'runtime/generator/';
        !is_dir($path) && mkdir($path, 0755, true);
        del_target_dir($path, false);
    }


    // 设置生成状态
    public function setGenerateFlag($name, $status = false)
    {
        $this->flag = $name;
        cache($name, (int)$status, 3600);
    }

    // 获取生成状态标记
    public function getGenerateFlag()
    {
        return cache($this->flag);
    }

    // 删除标记时间
    public function delGenerateFlag()
    {
        cache($this->flag, null);
    }


    /**
     * @notes 生成器相关类
     * @return string[]
     * @author 段誉
     * @date 2022/6/23 17:17
     */
    public function getGeneratorClass()
    {
        return [
            ControllerGenerator::class,
            ListsGenerator::class,
            ModelGenerator::class,
            ValidateGenerator::class,
            LogicGenerator::class,
            VueApiGenerator::class,
            VueIndexGenerator::class,
            VueEditGenerator::class,
        ];
    }


    // 生成文件
    public function generate(array $tableData)
    {
        foreach ($this->getGeneratorClass() as $item) {
            $generator = app()->make($item);
            $generator->initGenerateData($tableData);
            $generator->generate();
            // 是否为压缩包下载
            if ($generator->isGenerateTypeZip()) {
                $this->setGenerateFlag($this->flag, true);
            }
        }
    }


    // 预览文件
    public function preview(array $tableData)
    {
        $data = [];
        foreach ($this->getGeneratorClass() as $item) {
            $generator = app()->make($item);
            $generator->initGenerateData($tableData);
            $data[] = $generator->fileInfo();
        }
        return $data;
    }

}
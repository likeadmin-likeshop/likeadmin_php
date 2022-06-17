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


use app\common\service\generator\core\GenerateInterface;

class GenerateService
{
    protected $generate;

    public function __construct(GenerateInterface $generate)
    {
        $this->generate = $generate;
    }

    public function check(array $data): array
    {
        return $this->generate->check($data);
    }

    public function generate($table): array
    {
        return $this->generate->generate($table);
    }

    public function preview(array $data): array
    {
        return $this->generate->preview($data);
    }

}
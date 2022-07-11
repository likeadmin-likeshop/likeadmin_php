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

namespace app\adminapi\controller;

use app\adminapi\logic\auth\AuthLogic;
use app\adminapi\logic\ConfigLogic;

/**
 * 配置控制器
 * Class ConfigController
 * @package app\adminapi\controller
 */
class ConfigController extends BaseAdminController
{
    public array $notNeedLogin = ['getConfig'];


    /**
     * @notes 基础配置
     * @return \think\response\Json
     * @author 段誉
     * @date 2021/12/31 11:01
     */
    public function getConfig()
    {
        $data = ConfigLogic::getConfig();
        return $this->data($data);
    }
}
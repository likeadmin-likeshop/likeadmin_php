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

namespace app\adminapi\controller\setting\system;


use app\adminapi\controller\BaseAdminController;
use app\adminapi\lists\setting\system\LogLists;

/**
 * 系统日志
 * Class LogController
 * @package app\adminapi\controller\setting\system
 */
class LogController extends BaseAdminController
{
    /**
     * @notes 查看系统日志列表
     * @return \think\response\Json
     * @author ljj
     * @date 2021/8/3 4:25 下午
     */
    public function lists()
    {
        return $this->dataLists(new LogLists());
    }
}
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

namespace app\adminapi\controller\setting;

use app\adminapi\controller\BaseAdminController;
use app\adminapi\logic\setting\CustomerServiceLogic;

/**
 * 客服设置
 * Class CustomerServiceController
 * @package app\adminapi\controller\setting
 */
class CustomerServiceController extends BaseAdminController
{
    /**
     * @notes 获取客服设置
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/15 12:05 下午
     */
    public function getConfig()
    {
        $result = CustomerServiceLogic::getConfig();
        return $this->data($result);
    }

    /**
     * @notes 设置客服设置
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/15 12:11 下午
     */
    public function setConfig()
    {
        $params = $this->request->post();
        CustomerServiceLogic::setConfig($params);
        return $this->success('设置成功', [], 1, 1);
    }
}
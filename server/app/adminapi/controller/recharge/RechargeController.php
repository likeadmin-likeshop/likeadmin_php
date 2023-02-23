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

namespace app\adminapi\controller\recharge;

use app\adminapi\controller\BaseAdminController;
use app\adminapi\logic\recharge\RechargeLogic;

/**
 * 充值控制器
 * Class RechargeController
 * @package app\adminapi\controller\recharge
 */
class RechargeController extends BaseAdminController
{

    /**
     * @notes 获取充值设置
     * @return \think\response\Json
     * @author 段誉
     * @date 2023/2/22 16:48
     */
    public function getConfig()
    {
        $result = RechargeLogic::getConfig();
        return $this->data($result);
    }


    /**
     * @notes 充值设置
     * @return \think\response\Json
     * @author 段誉
     * @date 2023/2/22 16:48
     */
    public function setConfig()
    {
        $params = $this->request->post();
        $result = RechargeLogic::setConfig($params);
        if($result) {
            return $this->success('操作成功', [], 1, 1);
        }
        return $this->fail(RechargeLogic::getError());
    }
}
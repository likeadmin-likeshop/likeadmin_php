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
use app\adminapi\logic\setting\TransactionSettingsLogic;
use app\adminapi\validate\setting\TransactionSettingsValidate;

/**
 * 交易设置
 * Class TransactionSettingsController
 * @package app\adminapi\controller\setting
 */
class TransactionSettingsController extends BaseAdminController
{
    /**
     * @notes 获取交易设置
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/15 11:40 上午
     */
    public function getConfig()
    {
        $result = TransactionSettingsLogic::getConfig();
        return $this->data($result);
    }

    /**
     * @notes 设置交易设置
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/15 11:50 上午
     */
    public function setConfig()
    {
        $params = (new TransactionSettingsValidate())->post()->goCheck('setConfig');
        TransactionSettingsLogic::setConfig($params);
        return $this->success('操作成功',[],1,1);
    }
}
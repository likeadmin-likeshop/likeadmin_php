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

namespace app\adminapi\logic\recharge;


use app\common\logic\BaseLogic;
use app\common\service\ConfigService;


/**
 * 充值逻辑层
 * Class RechargeLogic
 * @package app\adminapi\logic\recharge
 */
class RechargeLogic extends BaseLogic
{

    /**
     * @notes 获取充值设置
     * @return array
     * @author 段誉
     * @date 2023/2/22 16:54
     */
    public static function getConfig()
    {
        $config = [
            'status' => ConfigService::get('recharge', 'status', 0),
            'min_amount' => ConfigService::get('recharge', 'min_amount', 0)
        ];

        return $config;
    }


    /**
     * @notes 充值设置
     * @param $params
     * @return bool
     * @author 段誉
     * @date 2023/2/22 16:54
     */
    public static function setConfig($params)
    {
        try {
            if(isset($params['status'])) {
                ConfigService::set('recharge', 'status', $params['status']);
            }
            if(isset($params['min_amount'])) {
                ConfigService::set('recharge', 'min_amount', $params['min_amount']);
            }
            return true;
        } catch(\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }




}
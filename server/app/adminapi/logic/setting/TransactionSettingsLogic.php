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

namespace app\adminapi\logic\setting;

use app\common\logic\BaseLogic;
use app\common\service\ConfigService;

/**
 * 交易设置逻辑
 * Class TransactionSettingsLogic
 * @package app\adminapi\logic\setting
 */
class TransactionSettingsLogic extends BaseLogic
{
    /**
     * @notes 获取交易设置
     * @return array
     * @author ljj
     * @date 2022/2/15 11:40 上午
     */
    public static function getConfig()
    {
        $config = [
            'cancel_unpaid_orders' => ConfigService::get('transaction', 'cancel_unpaid_orders', 1),
            'cancel_unpaid_orders_times' => ConfigService::get('transaction', 'cancel_unpaid_orders_times', 30),
            'verification_orders' => ConfigService::get('transaction', 'verification_orders', 1),
            'verification_orders_times' => ConfigService::get('transaction', 'verification_orders_times', 24),
        ];

        return $config;
    }

    /**
     * @notes 设置交易设置
     * @param $params
     * @author ljj
     * @date 2022/2/15 11:49 上午
     */
    public static function setConfig($params)
    {
        ConfigService::set('transaction', 'cancel_unpaid_orders', $params['cancel_unpaid_orders']);
        ConfigService::set('transaction', 'verification_orders', $params['verification_orders']);

        if (isset($params['cancel_unpaid_orders_times'])) {
            ConfigService::set('transaction', 'cancel_unpaid_orders_times', $params['cancel_unpaid_orders_times']);
        }

        if (isset($params['verification_orders_times'])) {
            ConfigService::set('transaction', 'verification_orders_times', $params['verification_orders_times']);
        }
    }
}
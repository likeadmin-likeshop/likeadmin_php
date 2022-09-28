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
use app\common\service\FileService;

/**
 * 客服设置逻辑
 * Class CustomerServiceLogic
 * @package app\adminapi\logic\setting
 */
class CustomerServiceLogic extends BaseLogic
{
    /**
     * @notes 获取客服设置
     * @return array
     * @author ljj
     * @date 2022/2/15 12:05 下午
     */
    public static function getConfig()
    {
        $qrCode = ConfigService::get('customer_service', 'qr_code');
        $qrCode = empty($qrCode) ? '' : FileService::getFileUrl($qrCode);
        $config = [
            'qr_code' => $qrCode,
            'wechat' => ConfigService::get('customer_service', 'wechat', ''),
            'phone' => ConfigService::get('customer_service', 'phone', ''),
            'service_time' => ConfigService::get('customer_service', 'service_time', ''),
        ];
        return $config;
    }

    /**
     * @notes 设置客服设置
     * @param $params
     * @author ljj
     * @date 2022/2/15 12:11 下午
     */
    public static function setConfig($params)
    {
        $allowField = ['qr_code','wechat','phone','service_time'];
        foreach($params as $key => $value) {
            if(in_array($key, $allowField)) {
                if ($key == 'qr_code') {
                    $value = FileService::setFileUrl($value);
                }
                ConfigService::set('customer_service', $key, $value);
            }
        }
    }
}
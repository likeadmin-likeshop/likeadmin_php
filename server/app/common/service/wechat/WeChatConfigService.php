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
namespace app\common\service\wechat;

use app\common\service\ConfigService;

/**
 * 微信配置类
 * Class WeChatConfigService
 * @package app\common\service
 */
class WeChatConfigService
{
    /**
     * @notes 获取小程序配置
     * @return array
     * @author 段誉
     * @date 2022/9/6 19:49
     */
    public static function getMnpConfig()
    {
        return [
            'app_id' => ConfigService::get('mnp_setting', 'app_id'),
            'secret' => ConfigService::get('mnp_setting', 'app_secret'),
            'mch_id' => ConfigService::get('mnp_setting', 'mch_id'),
            'key' => ConfigService::get('mnp_setting', 'key'),
            'response_type' => 'array',
            'log' => [
                'level' => 'debug',
                'file' => app()->getRootPath() . '/runtime/log/wechat/' . date('Ym') . '/' . date('d') . '.log'
            ],
        ];
    }


    /**
     * @notes 获取微信公众号配置
     * @return array
     * @author 段誉
     * @date 2022/9/6 19:49
     */
    public static function getOaConfig()
    {
        return [
            'app_id' => ConfigService::get('oa_setting', 'app_id'),
            'secret' => ConfigService::get('oa_setting', 'app_secret'),
            'mch_id' => ConfigService::get('oa_setting', 'mch_id'),
            'key' => ConfigService::get('oa_setting', 'key'),
            'token' => ConfigService::get('oa_setting', 'token'),
            'response_type' => 'array',
            'log' => [
                'level' => 'debug',
                'file' => app()->getRootPath() . '/runtime/log/wechat/' . date('Ym') . '/' . date('d') . '.log'
            ],
        ];
    }


    /**
     * @notes 获取微信开放平台配置
     * @return array
     * @author 段誉
     * @date 2022/10/20 15:51
     */
    public static function getOpConfig()
    {
        return [
            'app_id' => ConfigService::get('open_platform', 'app_id'),
            'secret' => ConfigService::get('open_platform', 'app_secret'),
            'response_type' => 'array',
            'log' => [
                'level' => 'debug',
                'file' => app()->getRootPath() . '/runtime/log/wechat/' . date('Ym') . '/' . date('d') . '.log'
            ],
        ];
    }

}
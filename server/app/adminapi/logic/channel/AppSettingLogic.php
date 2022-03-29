<?php
// +----------------------------------------------------------------------
// | likeshop100%开源免费商用商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | 商业版本务必购买商业授权，以免引起法律纠纷
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshopTeam
// +----------------------------------------------------------------------
namespace app\adminapi\logic\channel;

use app\common\logic\BaseLogic;
use app\common\service\ConfigService;

/**
 * App设置逻辑层
 * Class AppSettingLogic
 * @package app\adminapi\logic\settings\app
 */
class AppSettingLogic extends BaseLogic
{

    /**
     * @notes 获取App设置
     * @return array
     * @author 段誉
     * @date 2022/3/29 10:25
     */
    public static function getConfig()
    {
        $config = [
            'ios_download_url' => ConfigService::get('app', 'ios_download_url', ''),
            'android_download_url' => ConfigService::get('app', 'android_download_url', ''),
            'download_title' => ConfigService::get('app', 'download_title', ''),
        ];
        return $config;
    }


    /**
     * @notes App设置
     * @param $params
     * @author 段誉
     * @date 2022/3/29 10:26
     */
    public static function setConfig($params)
    {
        ConfigService::set('app', 'ios_download_url', $params['ios_download_url'] ?? '');
        ConfigService::set('app', 'android_download_url', $params['android_download_url'] ?? '');
        ConfigService::set('app', 'download_title', $params['download_title'] ?? '');
    }
}
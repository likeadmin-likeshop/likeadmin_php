<?php
// +----------------------------------------------------------------------
// | likeshop开源商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop系列产品在gitee、github等公开渠道开源版本可免费商用，未经许可不能去除前后端官方版权标识
// |  likeshop系列产品收费版本务必购买商业授权，购买去版权授权后，方可去除前后端官方版权标识
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | likeshop团队版权所有并拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshop.cn.team
// +----------------------------------------------------------------------

namespace app\adminapi\logic\channel;

use app\common\logic\BaseLogic;
use app\common\service\ConfigService;
use app\common\service\FileService;

/**
 * 公众号设置逻辑
 * Class OfficialAccountSettingLogic
 * @package app\adminapi\logic\channel
 */
class OfficialAccountSettingLogic extends BaseLogic
{
    /**
     * @notes 获取公众号配置
     * @return array
     * @author ljj
     * @date 2022/2/16 10:08 上午
     */
    public function getConfig()
    {
        $domainName = $_SERVER['SERVER_NAME'];
        $qrCode = ConfigService::get('official_account_settings', 'qr_code', '');
        $qrCode = empty($qrCode) ? $qrCode : FileService::getFileUrl($qrCode);
        $config = [
            'name'              => ConfigService::get('official_account_settings', 'name', ''),
            'original_id'       => ConfigService::get('official_account_settings', 'original_id', ''),
            'qr_code'           => $qrCode,
            'app_id'            => ConfigService::get('official_account_settings', 'app_id', ''),
            'app_secret'        => ConfigService::get('official_account_settings', 'app_secret', ''),
            // url()方法返回Url实例，通过与空字符串连接触发该实例的__toString()方法以得到路由地址
            'url'               => url('adminapi/wechat.official_account_reply/index', [],'',true).'',
            'token'             => ConfigService::get('official_account_settings', 'token'),
            'encoding_aes_key'  => ConfigService::get('official_account_settings', 'encoding_aes_key', ''),
            'encryption_type'   => ConfigService::get('official_account_settings', 'encryption_type'),
            'business_domain'   => $domainName,
            'js_secure_domain'  => $domainName,
            'web_auth_domain'   => $domainName,
        ];
        return $config;
    }

    /**
     * @notes 设置公众号配置
     * @param $params
     * @author ljj
     * @date 2022/2/16 10:08 上午
     */
    public function setConfig($params)
    {
        $qrCode = isset($params['qr_code']) ? FileService::setFileUrl($params['qr_code']) : '';

        ConfigService::set('official_account_settings','name', $params['name'] ?? '');
        ConfigService::set('official_account_settings','original_id', $params['original_id'] ?? '');
        ConfigService::set('official_account_settings','qr_code', $qrCode);
        ConfigService::set('official_account_settings','app_id',$params['app_id']);
        ConfigService::set('official_account_settings','app_secret',$params['app_secret']);
        ConfigService::set('official_account_settings','token',$params['token'] ?? '');
        ConfigService::set('official_account_settings','encoding_aes_key',$params['encoding_aes_key'] ?? '');
        ConfigService::set('official_account_settings','encryption_type',$params['encryption_type']);
    }
}
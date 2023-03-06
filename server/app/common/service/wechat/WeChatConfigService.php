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

use app\common\enum\PayEnum;
use app\common\enum\user\UserTerminalEnum;
use app\common\model\pay\PayConfig;
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
            'response_type' => 'array',
            'log' => [
                'level' => 'debug',
                'file' => app()->getRootPath() . 'runtime/wechat/' . date('Ym') . '/' . date('d') . '.log'
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
            'token' => ConfigService::get('oa_setting', 'token'),
            'response_type' => 'array',
            'log' => [
                'level' => 'debug',
                'file' => app()->getRootPath() . 'runtime/wechat/' . date('Ym') . '/' . date('d') . '.log'
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
                'file' => app()->getRootPath() . 'runtime/wechat/' . date('Ym') . '/' . date('d') . '.log'
            ],
        ];
    }


    /**
     * @notes 根据终端获取支付配置
     * @param $terminal
     * @return array
     * @author 段誉
     * @date 2023/2/27 15:45
     */
    public static function getPayConfigByTerminal($terminal)
    {
        switch ($terminal) {
            case UserTerminalEnum::WECHAT_MMP:
                $notifyUrl = (string)url('pay/notifyMnp', [], false, true);
                break;
            case UserTerminalEnum::WECHAT_OA:
            case UserTerminalEnum::PC:
            case UserTerminalEnum::H5:
                $notifyUrl = (string)url('pay/notifyOa', [], false, true);
                break;
            case UserTerminalEnum::ANDROID:
            case UserTerminalEnum::IOS:
                $notifyUrl = (string)url('pay/notifyApp', [], false, true);
                break;
        }

        $pay = PayConfig::where(['pay_way' => PayEnum::WECHAT_PAY])->findOrEmpty()->toArray();
        //判断是否已经存在证书文件夹，不存在则新建
        if (!file_exists(app()->getRootPath() . 'runtime/cert')) {
            mkdir(app()->getRootPath() . 'runtime/cert', 0775, true);
        }
        //写入文件
        $apiclientCert = $pay['config']['apiclient_cert'] ?? '';
        $apiclientKey = $pay['config']['apiclient_key'] ?? '';

        $certPath = app()->getRootPath() . 'runtime/cert/' . md5($apiclientCert) . '.pem';
        $keyPath = app()->getRootPath() . 'runtime/cert/' . md5($apiclientKey) . '.pem';

        if (!empty($apiclientCert) && !file_exists($certPath)) {
            static::setCert($certPath, trim($apiclientCert));
        }
        if (!empty($apiclientKey) && !file_exists($keyPath)) {
            static::setCert($keyPath, trim($apiclientKey));
        }

        return [
            // 商户号
            'mch_id' => $pay['config']['mch_id'] ?? '',
            // 商户证书
            'private_key' => $keyPath,
            'certificate' => $certPath,
            // v3 API 秘钥
            'secret_key' => $pay['config']['pay_sign_key'] ?? '',
            'notify_url' => $notifyUrl,
            'http' => [
                'throw'  => true, // 状态码非 200、300 时是否抛出异常，默认为开启
                'timeout' => 5.0,
            ]
        ];
    }


    /**
     * @notes 临时写入证书
     * @param $path
     * @param $cert
     * @author 段誉
     * @date 2023/2/27 15:48
     */
    public static function setCert($path, $cert)
    {
        $fopenPath = fopen($path, 'w');
        fwrite($fopenPath, $cert);
        fclose($fopenPath);
    }


}
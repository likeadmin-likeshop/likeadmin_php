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
namespace app\adminapi\logic\setting\user;

use app\common\{service\ConfigService, service\FileService};

/**
 * 设置-用户设置逻辑层
 * Class UserLogic
 * @package app\adminapi\logic\config
 */
class UserLogic
{

    /**
     * @notes 获取用户设置
     * @return array
     * @author 段誉
     * @date 2022/3/29 10:09
     */
    public static function getConfig(): array
    {
        $defaultAvatar = FileService::getFileUrl(config('project.default_image.user_avatar'));
        $config = [
            //默认头像
            'default_avatar' => ConfigService::get('config', 'default_avatar', $defaultAvatar),
        ];
        return $config;
    }


    /**
     * @notes 设置用户设置
     * @param array $params
     * @return bool
     * @author 段誉
     * @date 2022/3/29 10:09
     */
    public function setConfig(array $params): bool
    {
        ConfigService::set('config', 'default_avatar', $params['default_avatar']);
        return true;
    }


    /**
     * @notes 获取注册配置
     * @return array
     * @author 段誉
     * @date 2022/3/29 10:10
     */
    public function getRegisterConfig(): array
    {
        $config = [
            //注册方式
            'register_way' => ConfigService::get('config', 'register_way', config('project.login.register_way')),
            //登录方式
            'login_way' => ConfigService::get('config', 'login_way', config('project.login.login_way')),
            //手机号码注册需验证码
            'is_mobile_register_code' => ConfigService::get('config', 'is_mobile_register_code', config('project.login.is_mobile_register_code')),
            //注册强制绑定手机
            'coerce_mobile' => ConfigService::get('config', 'coerce_mobile', config('project.login.coerce_mobile')),
            //公众号微信授权登录
            'h5_wechat_auth' => ConfigService::get('config', 'h5_wechat_auth', config('project.login.h5_wechat_auth')),
            //公众号自动微信授权登录
            'h5_auto_wechat_auth' => ConfigService::get('config', 'h5_auto_wechat_auth', config('project.login.h5_auto_wechat_auth')),
            //小程序微信授权登录
            'mnp_wechat_auth' => ConfigService::get('config', 'mnp_wechat_auth', config('project.login.mnp_wechat_auth')),
            //小程序自动微信授权登录
            'mnp_auto_wechat_auth' => ConfigService::get('config', 'mnp_auto_wechat_auth', config('project.login.mnp_auto_wechat_auth')),
            //APP微信授权登录
            'app_wechat_auth' => ConfigService::get('config', 'app_wechat_auth', config('project.login.app_wechat_auth')),
        ];
        return $config;
    }



    /**
     * @notes 设置登录注册
     * @param array $params
     * @return bool
     * @author 段誉
     * @date 2022/3/29 10:10
     */
    public static function setRegisterConfig(array $params): bool
    {
        //注册方式:1-手机号注册
        ConfigService::set('config', 'register_way', $params['register_way']);
        //登录方式：1-账号密码登录；2-手机短信验证码登录
        ConfigService::set('config', 'login_way', $params['login_way']);
        //手机号码注册需验证码
        ConfigService::set('config', 'is_mobile_register_code', $params['is_mobile_register_code']);
        //注册强制绑定手机
        ConfigService::set('config', 'coerce_mobile', $params['coerce_mobile']);
        //公众号微信授权登录
        ConfigService::set('config', 'h5_wechat_auth', $params['h5_wechat_auth']);
        //公众号自动微信授权登录
        ConfigService::set('config', 'h5_auto_wechat_auth', $params['h5_auto_wechat_auth']);
        //小程序微信授权登录
        ConfigService::set('config', 'mnp_wechat_auth', $params['mnp_wechat_auth']);
        //小程序自动微信授权登录
        ConfigService::set('config', 'mnp_auto_wechat_auth', $params['mnp_auto_wechat_auth']);
        //APP微信授权登录
        ConfigService::set('config', 'app_wechat_auth', $params['app_wechat_auth']);
        return true;
    }

}
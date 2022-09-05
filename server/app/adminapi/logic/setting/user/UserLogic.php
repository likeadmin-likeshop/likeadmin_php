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

use app\common\service\{ConfigService, FileService};

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
            // 登录方式
            'login_way' => ConfigService::get('config', 'login_way', config('project.login.login_way')),
            // 注册强制绑定手机
            'coerce_mobile' => ConfigService::get('config', 'coerce_mobile', config('project.login.coerce_mobile')),
            // 政策协议
            'login_agreement' => ConfigService::get('config', 'login_agreement', config('project.login.login_agreement')),
            // 第三方登录 开关
            'third_auth' => ConfigService::get('config', 'third_auth', config('project.login.third_auth')),
            // 微信授权登录
            'wechat_auth' => ConfigService::get('config', 'wechat_auth', config('project.login.wechat_auth')),
            // qq授权登录
            'qq_auth' => ConfigService::get('config', 'wechat_auth', config('project.login.qq_auth')),
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
        // 登录方式：1-账号密码登录；2-手机短信验证码登录
        ConfigService::set('config', 'login_way', $params['login_way']);
        // 注册强制绑定手机
        ConfigService::set('config', 'coerce_mobile', $params['coerce_mobile']);
        // 政策协议
        ConfigService::set('config', 'login_agreement', $params['login_agreement']);
        // 第三方授权登录
        ConfigService::set('config', 'third_auth', $params['third_auth']);
        // 微信授权登录
        ConfigService::set('config', 'wechat_auth', $params['wechat_auth']);
        // qq登录
        ConfigService::set('config', 'qq_auth', $params['qq_auth']);
        return true;
    }

}
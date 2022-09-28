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
namespace app\api\validate;

use app\common\validate\BaseValidate;

/**
 * 密码校验
 * Class PasswordValidate
 * @package app\api\validate
 */
class PasswordValidate extends BaseValidate
{

    protected $rule = [
        'mobile' => 'require|mobile',
        'code' => 'require',
        'password' => 'require|length:6,20|alphaNum',
        'password_confirm' => 'require|confirm',
    ];


    protected $message = [
        'mobile.require' => '请输入手机号',
        'mobile.mobile' => '请输入正确手机号',
        'code.require' => '请填写验证码',
        'password.require' => '请输入密码',
        'password.length' => '密码须在6-25位之间',
        'password.alphaNum' => '密码须为字母数字组合',
        'password_confirm.require' => '请确认密码',
        'password_confirm.confirm' => '两次输入的密码不一致'
    ];


    /**
     * @notes 重置登录密码
     * @return PasswordValidate
     * @author 段誉
     * @date 2022/9/16 18:11
     */
    public function sceneResetPassword()
    {
        return $this->only(['mobile', 'code', 'password', 'password_confirm']);
    }


    /**
     * @notes 修改密码场景
     * @return PasswordValidate
     * @author 段誉
     * @date 2022/9/20 19:14
     */
    public function sceneChangePassword()
    {
        return $this->only(['password', 'password_confirm']);
    }

}
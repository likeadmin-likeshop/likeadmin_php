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

namespace app\adminapi\validate\auth;

use app\common\validate\BaseValidate;
use app\common\model\auth\Admin;
use think\facade\Config;

/**
 * 编辑超级管理员验证
 * Class editSelfValidate
 * @package app\adminapi\validate\auth
 */
class editSelfValidate extends BaseValidate
{

    protected $rule = [
        'name' => 'require|length:1,16',
        'avatar' => 'require',
        'password' => 'length:6,32|checkPassword',
        'password_confirm' => 'requireWith:password|confirm',
    ];


    protected $message = [
        'name.require' => '请填写名称',
        'name.length' => '名称须在1-16位字符',
        'avatar.require' => '请选择头像',
        'password_now.length' => '密码长度须在6-32位字符',
        'password_confirm.requireWith' => '确认密码不能为空',
        'password_confirm.confirm' => '两次输入的密码不一致',
    ];


    /**
     * @notes 校验密码
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2022/4/8 17:40
     */
    public function checkPassword($value, $rule, $data)
    {
        if (empty($data['password_old'])) {
            return '请填写当前密码';
        }

        $admin = Admin::findOrEmpty($data['admin_id']);
        $passwordSalt = Config::get('project.unique_identification');
        $oldPassword = create_password($data['password_old'], $passwordSalt);

        if ($admin['password'] != $oldPassword) {
            return '当前密码错误';
        }

        return true;
    }

}
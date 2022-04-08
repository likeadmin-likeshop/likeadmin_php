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
        'password_old' => 'length:6,32',
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
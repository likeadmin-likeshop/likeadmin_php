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

/**
 * 管理员验证
 * Class AdminValidate
 * @package app\adminapi\validate\auth
 */
class AdminValidate extends BaseValidate
{
    protected $rule = [
        'id' => 'require|checkAdmin',
        'account' => 'require|length:1,32|checkUsed',
        'password' => 'require|length:6,32|edit',
        'password_confirm' => 'requireWith:password|confirm',
        'name' => 'require|length:1,16',
        'role_id' => 'require',
        'disable' => 'require|in:0,1',
        'multipoint_login' => 'require|in:0,1',
    ];

    protected $message = [
        'id.require' => '管理员id不能为空',
        'account.require' => '账号不能为空',
        'account.length' => '账号长度须在1-32位字符',
        'password.require' => '密码不能为空',
        'password.length' => '密码长度须在6-32位字符',
        'password_confirm.requireWith' => '确认密码不能为空',
        'password_confirm.confirm' => '两次输入的密码不一致',
        'name.require' => '名称不能为空',
        'name.length' => '名称须在1-16位字符',
        'role_id.require' => '请选择角色',
        'disable.require' => '请选择状态',
        'disable.in' => '状态值错误',
        'multipoint_login.require' => '请选择是否支持多处登录',
        'multipoint_login.in' => '多处登录状态值为误',
    ];

    public function sceneAdd()
    {
        return $this->remove(['password', 'edit'])
            ->remove('id', 'require|checkAdmin');
    }

    public function sceneDetail()
    {
        return $this->only(['id']);
    }

    public function sceneEdit()
    {
        return $this->remove('password', 'require|length')
            ->append('id', 'require|checkAdmin');
    }

    public function sceneDelete()
    {
        return $this->only(['id']);
    }

    /**
     * @notes 检查账号是否已被使用
     * @param $value
     * @return bool|string
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Tab
     * @date 2021/7/13 11:38
     */
    public function checkUsed($value, $rule, $data)
    {
        $where = [
            ['account', '=', $value]
        ];
        // 编辑的情况，要排除自身ID
        if (isset($data['id'])) {
            $where[] = ['id', '<>', $data['id']];
        }
        $admins = Admin::where($where)->select()->toArray();
        if ($admins) {
            return '账号已被占用';
        }
        return true;
    }

    /**
     * @notes 编辑情况下，检查是否填密码
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author Tab
     * @date 2021/7/13 11:38
     */
    public function edit($value, $rule, $data)
    {
        if (empty($data['password']) && empty($data['password_confirm'])) {
            return true;
        }
        $len = strlen($value);
        if ($len < 6 || $len > 32) {
            return '密码长度须在6-32位字符';
        }
        return true;
    }

    /**
     * @notes 检查指定管理员是否存在
     * @param $value
     * @return bool|string
     * @author Tab
     * @date 2021/7/13 11:39
     */
    public function checkAdmin($value)
    {
        $admin = Admin::findOrEmpty($value);
        if ($admin->isEmpty()) {
            return '管理员不存在';
        }
        return true;
    }
}
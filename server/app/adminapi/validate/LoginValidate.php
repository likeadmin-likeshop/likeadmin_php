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


namespace app\adminapi\validate;


use app\common\enum\AdminTerminalEnum;
use app\common\model\auth\Admin;
use app\common\cache\AdminAccountSafeCache;
use app\common\service\ConfigService;
use app\common\validate\BaseValidate;
use think\facade\Config;

/**
 * 登录验证
 * Class LoginValidate
 * @package app\adminapi\validate
 */
class LoginValidate extends BaseValidate
{
    protected $rule = [
        'terminal' => 'require|in:' . AdminTerminalEnum::PC . ',' . AdminTerminalEnum::MOBILE,
        'account' => 'require',
        'password' => 'require|password',
    ];

    protected $message = [
        'account.require' => '请输入账号',
        'password.require' => '请输入密码'
    ];

    /**
     * @notes @notes 密码验证
     * @param $password
     * @param $other
     * @param $data
     * @return bool|string
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 令狐冲
     * @date 2021/7/2 14:00
     */
    public function password($password, $other, $data)
    {
        // 登录限制
        $config = [
            'login_restrictions' => ConfigService::get('admin_login', 'login_restrictions'),
            'password_error_times' => ConfigService::get('admin_login', 'password_error_times'),
            'limit_login_time' => ConfigService::get('admin_login', 'limit_login_time'),
        ];

        $adminAccountSafeCache = new AdminAccountSafeCache();
        if ($config['login_restrictions'] == 1) {
            $adminAccountSafeCache->count = $config['password_error_times'];
            $adminAccountSafeCache->minute = $config['limit_login_time'];
        }

        //后台账号安全机制，连续输错后锁定，防止账号密码暴力破解
        if ($config['login_restrictions'] == 1 && !$adminAccountSafeCache->isSafe()) {
            return '密码连续' . $adminAccountSafeCache->count . '次输入错误，请' . $adminAccountSafeCache->minute . '分钟后重试';
        }

        $adminInfo = Admin::where('account', '=', $data['account'])
            ->field(['password,disable'])
            ->findOrEmpty();

        if ($adminInfo->isEmpty()) {
            return '账号不存在';
        }

        if ($adminInfo['disable'] === 1) {
            return '账号已禁用';
        }

        if (empty($adminInfo['password'])) {
            $adminAccountSafeCache->record();
            return '账号不存在';
        }

        $passwordSalt = Config::get('project.unique_identification');
        if ($adminInfo['password'] !== create_password($password, $passwordSalt)) {
            $adminAccountSafeCache->record();
            return '密码错误';
        }

        $adminAccountSafeCache->relieve();
        return true;
    }

}
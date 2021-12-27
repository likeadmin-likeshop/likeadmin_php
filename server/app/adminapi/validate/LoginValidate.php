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
            'login_restrictions' => ConfigService::get('shop', 'login_restrictions'),
            'password_error_times' => ConfigService::get('shop', 'password_error_times'),
            'limit_login_time' => ConfigService::get('shop', 'limit_login_time'),
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
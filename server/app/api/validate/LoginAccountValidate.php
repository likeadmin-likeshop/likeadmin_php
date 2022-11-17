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

use app\common\cache\UserAccountSafeCache;
use app\common\enum\LoginEnum;
use app\common\enum\notice\NoticeEnum;
use app\common\enum\user\UserTerminalEnum;
use app\common\enum\YesNoEnum;
use app\common\service\ConfigService;
use app\common\service\sms\SmsDriver;
use app\common\validate\BaseValidate;
use app\common\model\user\User;
use think\facade\Config;

/**
 * 账号密码登录校验
 * Class LoginValidate
 * @package app\api\validate
 */
class LoginAccountValidate extends BaseValidate
{

    protected $rule = [
        'terminal' => 'require|in:' . UserTerminalEnum::WECHAT_MMP . ',' . UserTerminalEnum::WECHAT_OA . ','
            . UserTerminalEnum::H5 . ',' . UserTerminalEnum::PC . ',' . UserTerminalEnum::IOS .
            ',' . UserTerminalEnum::ANDROID,
        'scene' => 'require|in:' . LoginEnum::ACCOUNT_PASSWORD . ',' . LoginEnum::MOBILE_CAPTCHA . '|checkConfig',
        'account' => 'require',
    ];


    protected $message = [
        'terminal.require' => '终端参数缺失',
        'terminal.in' => '终端参数状态值不正确',
        'scene.require' => '场景不能为空',
        'scene.in' => '场景值错误',
        'account.require' => '请输入账号',
        'password.require' => '请输入密码',
    ];


    /**
     * @notes 登录场景相关校验
     * @param $scene
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2022/9/15 14:37
     */
    public function checkConfig($scene, $rule, $data)
    {
        $config = ConfigService::get('login', 'login_way');
        if (!in_array($scene, $config)) {
            return '不支持的登录方式';
        }

        // 账号密码登录
        if (LoginEnum::ACCOUNT_PASSWORD == $scene) {
            if (!isset($data['password'])) {
                return '请输入密码';
            }
            return $this->checkPassword($data['password'], [], $data);
        }

        // 手机验证码登录
        if (LoginEnum::MOBILE_CAPTCHA == $scene) {
            if (!isset($data['code'])) {
                return '请输入手机验证码';
            }
            return $this->checkCode($data['code'], [], $data);
        }

        return true;
    }


    /**
     * @notes 登录密码校验
     * @param $password
     * @param $other
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2022/9/15 14:39
     */
    public function checkPassword($password, $other, $data)
    {
        //账号安全机制，连续输错后锁定，防止账号密码暴力破解
        $userAccountSafeCache = new UserAccountSafeCache();
        if (!$userAccountSafeCache->isSafe()) {
            return '密码连续' . $userAccountSafeCache->count . '次输入错误，请' . $userAccountSafeCache->minute . '分钟后重试';
        }

        $where = [];
        if ($data['scene'] == LoginEnum::ACCOUNT_PASSWORD) {
            // 手机号密码登录
            $where = ['account|mobile' => $data['account']];
        }

        $userInfo = User::where($where)
            ->field(['password,is_disable'])
            ->findOrEmpty();

        if ($userInfo->isEmpty()) {
            return '用户不存在';
        }

        if ($userInfo['is_disable'] === YesNoEnum::YES) {
            return '用户已禁用';
        }

        if (empty($userInfo['password'])) {
            $userAccountSafeCache->record();
            return '用户不存在';
        }

        $passwordSalt = Config::get('project.unique_identification');
        if ($userInfo['password'] !== create_password($password, $passwordSalt)) {
            $userAccountSafeCache->record();
            return '密码错误';
        }

        $userAccountSafeCache->relieve();

        return true;
    }


    /**
     * @notes 校验验证码
     * @param $code
     * @param $rule
     * @param $data
     * @return bool|string
     * @author Tab
     * @date 2021/8/25 15:43
     */
    public function checkCode($code, $rule, $data)
    {
        $smsDriver = new SmsDriver();
        $result = $smsDriver->verify($data['account'], $code, NoticeEnum::LOGIN_CAPTCHA);
        if ($result) {
            return true;
        }
        return '验证码错误';
    }
}
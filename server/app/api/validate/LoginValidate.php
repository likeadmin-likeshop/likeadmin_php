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
use app\common\enum\user\UserTerminalEnum;
use app\common\enum\YesNoEnum;
use app\common\service\ConfigService;
use app\common\service\sms\SmsDriver;
use app\common\validate\BaseValidate;
use think\facade\Config;

class LoginValidate extends BaseValidate
{

    protected $rule = [
        'terminal' => 'require|in:' . UserTerminalEnum::WECHAT_MMP . ',' . UserTerminalEnum::WECHAT_OA . ','
            . UserTerminalEnum::H5 . ',' . UserTerminalEnum::PC . ','
            . UserTerminalEnum::IOS . ',' . UserTerminalEnum::ANDROID,
        'scene' => 'require|in:' . LoginEnum::ACCOUNT_PASSWORD . ',' . LoginEnum::MOBILE_CAPTCHA . '|checkConfig',
        'account' => 'require',
        'mobile' => 'require|mobile'
    ];

    protected $message = [
        'terminal.require' => '终端参数缺失',
        'terminal.in' => '终端参数状态值不正确',
        'scene.require' => '场景不能为空',
        'scene.in' => '场景值错误',
        'account.require' => '请输入账号',
        'password.require' => '请输入密码',
        'mobile.require' => '请输入手机号',
        'mobile.mobile' => '无效的手机号',
    ];

    /**
     * @notes 账号密码/手机号密码/手机号验证码登录场景
     * @return LoginValidate
     * @author Tab
     * @date 2021/8/25 15:53
     */
    public function sceneAccount()
    {
        return $this->remove('mobile', 'require|mobile');
    }

    /**
     * @notes 发送登录验证码
     * @return LoginValidate
     * @author Tab
     * @date 2021/8/25 15:48
     */
    public function sceneCaptcha()
    {
        return $this->only(['mobile']);
    }

    /**
     * @notes 密码验证
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
    public function checkPassword($password, $other, $data)
    {
        //后台账号安全机制，连续输错后锁定，防止账号密码暴力破解
        $userAccountSafeCache = new UserAccountSafeCache();
        if (!$userAccountSafeCache->isSafe()) {
            return '密码连续' . $userAccountSafeCache->count . '次输入错误，请' . $userAccountSafeCache->minute . '分钟后重试';
        }

        $where = [];
        if ($data['scene'] == LoginEnum::ACCOUNT_PASSWORD || $data['scene'] == LoginEnum::MOBILE_CAPTCHA) {
            // 手机号密码登录
            $where = ['mobile' => $data['account']];
        }

        $userInfo = User::where($where)
            ->field(['password,disable'])
            ->find();

        if (empty($userInfo)) {
            return '用户不存在';
        }

        if ($userInfo['disable'] === YesNoEnum::YES) {
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
     * @notes 校验登录设置
     * @param $scene
     * @param $rule
     * @param $data
     * @return bool|string
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/7 16:21\
     */
    public function checkConfig($scene, $rule, $data)
    {
        $config = ConfigService::get('login', 'login_way', []);
        if (!in_array($scene, $config)) {
            return '不支持的登录方式';
        }
        if ($scene == LoginEnum::ACCOUNT_PASSWORD && !isset($data['password'])) {
            return '请输入密码';
        }
        if (($scene == LoginEnum::ACCOUNT_PASSWORD)) {
            return $this->checkPassword($data['password'], [], $data);
        }
        if ($scene == LoginEnum::MOBILE_CAPTCHA && !isset($data['code'])) {
            return '请输入手机验证码';
        }
        if ($scene == LoginEnum::MOBILE_CAPTCHA) {
            return $this->checkCode($data['code'], [], $data);
        }
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
        $result = $smsDriver->verify($data['account'], $code);
        if ($result) {
            return true;
        }
        return '验证码错误';
    }
}
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
namespace app\api\logic;

use EasyWeChat\Factory;
use app\common\{enum\DistributionConfigEnum,
    enum\UserTerminalEnum,
    enum\YesNoEnum,
    model\DistributionConfig,
    model\GoodsCollect,
    model\User,
    model\Order,
    enum\PayEnum,
    enum\OrderEnum,
    enum\CouponEnum,
    model\UserAuth,
    model\UserLevel,
    logic\BaseLogic,
    model\AfterSale,
    model\CouponList,
    enum\AfterSaleEnum,
    model\UserTransfer,
    service\FileService,
    enum\AccountLogEnum,
    service\ConfigService,
    logic\AccountLogLogic,
    service\sms\SmsDriver,
    service\WeChatConfigService,
    service\WeChatService
};

use think\Exception;
use think\facade\Config;
use think\facade\Db;

/**
 * 会员逻辑层
 * Class UserLogic
 * @package app\shopapi\logic
 */
class UserLogic extends BaseLogic
{

    /**
     * @notes 个人中心
     * @param int $userId
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author cjhao
     * @date 2021/8/6 19:16
     */
    public function centre(array $userInfo): array
    {
        $user = User::with('user_level')->field('id,sn,sex,nickname,avatar,user_money,user_integral,mobile,level,create_time,code')
            ->find($userInfo['user_id']);

        //是否有微信授权登录
        if (in_array($userInfo['terminal'], [UserTerminalEnum::WECHAT_MMP, UserTerminalEnum::WECHAT_OA])) {
            $auth = UserAuth::where(['user_id' => $userInfo['user_id'], 'terminal' => $userInfo['terminal']])->find();
            $user->is_auth = $auth ? 1 : 0;
        }

        $user->hidden(['name', 'rank']);
        return $user->toArray();
    }


    /**
     * @notes 设置用户信息
     * @param int $userId
     * @param array $params
     * @return bool
     * @author cjhao
     * @date 2021/8/6 19:44
     */
    public static function setInfo(int $userId, array $params): bool
    {
        User::update(['id' => $userId, $params['field'] => $params['value']]);
        return true;
    }

    /**
     * @notes 绑定手机号
     * @param $params
     * @return bool
     * @author Tab
     * @date 2021/8/25 17:55
     */
    public static function bindMobile($params)
    {
        try {
            $smsDriver = new SmsDriver();
            $result = $smsDriver->verify($params['mobile'], $params['code']);
            if (!$result) {
                throw new \Exception('验证码错误');
            }
            $user = User::where('mobile', $params['mobile'])->findOrEmpty();
            if (!$user->isEmpty()) {
                throw new \Exception('该手机号已被其他账号绑定');
            }
            unset($params['code']);
            User::update($params);
            return true;
        } catch (\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }


    /**
     * @notes 重置登录密码
     * @param $params
     * @return bool
     * @author Tab
     * @date 2021/8/25 17:03
     */
    public static function resetPassword($params)
    {
        try {
            // 校验验证码
            $smsDriver = new SmsDriver();
            if (!$smsDriver->verify($params['mobile'], $params['code'])) {
                throw new \Exception('验证码错误');
            }
            $passwordSalt = Config::get('project.unique_identification');
            $password = create_password($params['password'], $passwordSalt);

            User::where('mobile', $params['mobile'])->update([
                'password' => $password
            ]);

            return true;
        } catch (\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }


    /**
     * @notes 用户信息
     * @param $userId
     * @return array
     * @author Tab
     * @date 2021/8/25 17:22
     */
    public static function info($userId)
    {
        $user = User::field('sn,avatar,nickname,sex,mobile,create_time')->findOrEmpty($userId)->toArray();
        $user['has_password'] = empty($user['password']) ? '未设置' : '已设置';
        $user['version'] = request()->header('version');
        return $user;
    }

    /**
     * @notes 获取微信手机号
     * @param $params
     * @return array|false
     * @author Tab
     * @date 2021/8/24 15:20
     * @deprecated 小程序获取手机号码更新升级，旧接口放弃
     */
    public static function getMobileByMnp($params)
    {
        try {
            $config = [
                'app_id' => ConfigService::get('mini_program', 'app_id'),
                'secret' => ConfigService::get('mini_program', 'app_secret'),
            ];
            $app = Factory::miniProgram($config);
            $response = $app->auth->session($params['code']);
            if (!isset($response['session_key'])) {
                throw new \Exception('获取用户信息失败');
            }
            $response = $app->encryptor->decryptData($response['session_key'], $params['iv'], $params['encrypted_data']);
            $user = User::where([
                ['mobile', '=', $response['phoneNumber']],
                ['id', '<>', $params['user_id']]
            ])->findOrEmpty();
            if (!$user->isEmpty()) {
                throw new \Exception('手机号已被其他账号绑定');
            }
            // 绑定手机号
            self::setInfo($params['user_id'], [
                'field' => 'mobile',
                'value' => $response['phoneNumber']
            ]);

            return true;
        } catch (\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }

    /**
     * @notes 微信小程序获取手机号码并绑定
     * @param $params
     * @return bool
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @author cjhao
     * @date 2022/5/17 9:34
     */
    public static function getNewMobileByMnp($params)
    {
        try {
            $getMnpConfig = WeChatConfigService::getMnpConfig();
            $app = Factory::miniProgram($getMnpConfig);
            $response = $app->phone_number->getUserPhoneNumber($params['code']);

            $phoneNumber = $response['phone_info']['purePhoneNumber'] ?? '';
            if (empty($phoneNumber)) {
                throw new Exception('获取手机号码失败');
            }
            $user = User::where([
                ['mobile', '=', $phoneNumber],
                ['id', '<>', $params['user_id']]
            ])->findOrEmpty();

            if (!$user->isEmpty()) {
                throw new \Exception('手机号已被其他账号绑定');
            }

            // 绑定手机号
            self::setInfo($params['user_id'], [
                'field' => 'mobile',
                'value' => $phoneNumber
            ]);

            return true;
        } catch (\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }

    }

    /**
     * @notes 获取服务协议
     * @return array
     * @author Tab
     * @date 2021/8/24 16:48
     */
    public static function getServiceAgreement()
    {
        $data = [
            'service_agreement_name' => ConfigService::get('shop', 'service_agreement_name', ''),
            'service_agreement_content' => ConfigService::get('shop', 'service_agreement_content', ''),
        ];
        return $data;
    }

    /**
     * @notes 获取隐私政策
     * @return array
     * @author Tab
     * @date 2021/8/24 16:50
     */
    public static function getPrivacyPolicy()
    {
        $data = [
            'privacy_policy_name' => ConfigService::get('shop', 'privacy_policy_name', ''),
            'privacy_policy_content' => ConfigService::get('shop', 'privacy_policy_content', '')
        ];
        return $data;
    }

    /**
     * @notes 设置登录密码
     * @author Tab
     * @date 2021/10/22 18:10
     */
    public static function setPassword($params)
    {
        try {
            $user = User::findOrEmpty($params['user_id']);
            if ($user->isEmpty()) {
                throw new \Exception('用户不存在');
            }
            if (!empty($user->password)) {
                throw new \Exception('用户已设置登录密码');
            }
            $passwordSalt = Config::get('project.unique_identification');
            $password = create_password($params['password'], $passwordSalt);
            $user->password = $password;
            $user->save();

            return true;;
        } catch (\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }

    /**
     * @notes 修改登录密码
     * @param $params
     * @return bool
     * @author Tab
     * @date 2021/10/22 18:17
     */
    public static function changePassword($params)
    {
        try {
            $user = User::findOrEmpty($params['user_id']);
            if ($user->isEmpty()) {
                throw new \Exception('用户不存在');
            }
            $passwordSalt = Config::get('project.unique_identification');
            $oldPassword = create_password($params['old_password'], $passwordSalt);
            $newPassword = create_password($params['password'], $passwordSalt);
            if ($user->password != $oldPassword) {
                throw new \Exception('原密码错误');
            }
            $user->password = $newPassword;
            $user->save();

            return true;;
        } catch (\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }

    /**
     * @notes 判断用户是否有设置登录密码
     * @param $userId
     * @author Tab
     * @date 2021/10/22 18:25
     */
    public static function hasPassword($userId)
    {
        $user = User::findOrEmpty($userId);
        return empty($user->password) ? false : true;
    }


}
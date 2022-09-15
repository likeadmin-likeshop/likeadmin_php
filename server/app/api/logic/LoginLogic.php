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

use app\common\logic\BaseLogic;
use app\api\service\{UserTokenService, WechatUserService};
use app\common\enum\{LoginEnum, UserTerminalEnum};
use app\common\service\{ConfigService, FileService, wechat\WeChatService};
use app\common\model\user\{User, UserAuth};
use think\facade\{Db, Config};

/**
 * 登录逻辑
 * Class LoginLogic
 * @package app\api\logic
 */
class LoginLogic extends BaseLogic
{

    /**
     * @notes 账号密码注册
     * @param array $params
     * @return bool
     * @author 段誉
     * @date 2022/9/7 15:37
     */
    public static function register(array $params)
    {
        try {
            $userSn = self::createUserSn();
            $passwordSalt = Config::get('project.unique_identification');
            $password = create_password($params['password'], $passwordSalt);
            $avatar = ConfigService::get('default_image', 'user_avatar');

            User::create([
                'sn' => $userSn,
                'avatar' => $avatar,
                'nickname' => '用户'. $userSn,
                'account' => $params['account'],
                'password' => $password,
                'channel' => $params['channel'],
            ]);

            return true;
        } catch (\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }


    /**
     * @notes 生成用户编号
     * @param string $prefix
     * @param int $length
     * @return string
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/7 15:34
     */
    public static function createUserSn($prefix = '', $length = 8)
    {
        $rand_str = '';
        for ($i = 0; $i < $length; $i++) {
            $rand_str .= mt_rand(0, 9);
        }
        $sn = $prefix . $rand_str;
        if (User::where(['sn' => $sn])->find()) {
            return self::createUserSn($prefix, $length);
        }
        return $sn;
    }


    /**
     * @notes 账号/手机号登录，手机号验证码
     * @param $params
     * @return array|false
     * @author 段誉
     * @date 2022/9/6 19:26
     */
    public function login($params)
    {
        try {
            // 账号/手机号 密码登录
            $where = ['account|mobile' => $params['account']];
            if ($params['scene'] == LoginEnum::MOBILE_CAPTCHA) {
                //手机验证码登录
                $where = ['mobile' => $params['account']];
            }

            $user = User::where($where)->findOrEmpty();
            if ($user->isEmpty()) {
                throw new \Exception('用户不存在');
            }

            //更新登录信息
            $user->login_time = time();
            $user->login_ip = request()->ip();
            $user->save();

            //设置token
            $userInfo = UserTokenService::setToken($user->id, $params['terminal']);

            //返回登录信息
            $avatar = $user->avatar ?: Config::get('project.default_image.user_avatar');
            $avatar = FileService::getFileUrl($avatar);

            return [
                'nickname' => $userInfo['nickname'],
                'sn' => $userInfo['sn'],
                'mobile' => $userInfo['mobile'],
                'avatar' => $avatar,
                'token' => $userInfo['token'],
            ];
        } catch (\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }


    /**
     * @notes 退出登录
     * @param $userInfo
     * @return bool
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 令狐冲
     * @date 2021/7/5 14:34
     */
    public function logout($userInfo)
    {
        //token不存在，不注销
        if (!isset($userInfo['token'])) {
            return false;
        }

        //设置token过期
        return UserTokenService::expireToken($userInfo['token']);
    }


    /**
     * @notes 获取微信请求code的链接
     * @param $url
     * @return string
     * @author cjhao
     * @date 2021/7/31 14:28
     */
    public function codeUrl(string $url)
    {
        return WeChatService::getCodeUrl($url);
    }

    /**
     * @notes 公众号登录
     * @param $params
     * @return array|bool
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @author cjhao
     * @date 2021/8/2 17:54
     */
    public function oaLogin(array $params)
    {
        Db::startTrans();
        try {
            //通过code获取微信 openid
            $response = WeChatService::getOaResByCode($params);
            $userServer = new WechatUserService($response, UserTerminalEnum::WECHAT_OA);
            $userInfo = $userServer->getResopnseByUserInfo()->authUserLogin()->getUserInfo();
            // 更新登录信息
            $this->updateLoginInfo($userInfo['id']);

            Db::commit();
            return $userInfo;

        } catch (\Exception $e) {
            Db::rollback();
            self::$error = $e->getMessage();
            return false;
        }
    }


    /**
     * @notes 小程序-静默登录
     * @param $post
     * @return array|bool
     * @author cjhao
     * @date 2021/8/2 17:00
     */
    public function silentLogin(array $params)
    {
        try {
            //通过code获取微信 openid
            $response = WeChatService::getMnpResByCode($params);
            $userServer = new WechatUserService($response, UserTerminalEnum::WECHAT_MMP);
            $userInfo = $userServer->getResopnseByUserInfo('silent')->getUserInfo();
            if (!empty($userInfo)) {
                // 更新登录信息
                $this->updateLoginInfo($userInfo['id']);
            }

            return $userInfo;
        } catch (\Exception  $e) {
            self::$error = $e->getMessage();
            return false;
        }
    }


    /**
     * @notes 小程序-授权登录
     * @param $params
     * @return array|bool
     * @author cjhao
     * @date 2021/7/30 19:00
     */
    public function authLogin(array $params)
    {
        Db::startTrans();
        try {
            //通过code获取微信 openid
            $response = WeChatService::getMnpResByCode($params);
            $response['headimgurl'] = $params['headimgurl'];
            $response['nickname'] = $params['nickname'];
            $userServer = new WechatUserService($response, UserTerminalEnum::WECHAT_MMP);
            $userInfo = $userServer->getResopnseByUserInfo()->authUserLogin()->getUserInfo();
            // 更新登录信息
            $this->updateLoginInfo($userInfo['id']);

            Db::commit();
            return $userInfo;
        } catch (\Exception  $e) {
            Db::rollback();
            self::$error = $e->getMessage();
            return false;
        }
    }


    /**
     * @notes 更新登录信息
     * @param $userId
     * @throws \Exception
     * @author Tab
     * @date 2021/12/7 14:12
     */
    public function updateLoginInfo($userId)
    {
        $user = User::findOrEmpty($userId);
        if ($user->isEmpty()) {
            throw new \Exception('用户不存在');
        }
        $time = time();
        $user->login_time = $time;
        $user->login_ip = request()->ip();
        $user->update_time = $time;
        $user->save();
    }


    /**
     * @notes 小程序端绑定微信
     * @param array $params
     * @return bool
     * @author cjhao
     * @date 2022/5/17 15:47
     */
    public function mnpAuthLogin(array $params)
    {
        try {
            //通过code获取微信openid
            $response = WeChatService::getMnpResByCode($params);
            $response['user_id'] = $params['user_id'];
            $response['terminal'] = UserTerminalEnum::WECHAT_MMP;

            return $this->createAuth($response);
        } catch (\Exception  $e) {
            self::$error = $e->getMessage();
            return false;
        }
    }

    /**
     * @notes 公众号端绑定微信
     * @param array $params
     * @return bool
     * @throws AuthorizeFailedException
     * @throws Exception
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author cjhao
     * @date 2022/5/17 16:20
     */
    public function oaAuthLogin(array $params)
    {
        try {
            //通过code获取微信openid
            $response = WeChatService::getOaResByCode($params);
            $response['user_id'] = $params['user_id'];
            $response['terminal'] = UserTerminalEnum::WECHAT_OA;

            return $this->createAuth($response);

        } catch (\Exception  $e) {
            self::$error = $e->getMessage();
            return false;
        }
    }

    /**
     * @notes 生成一条授权记录
     * @param $response
     * @return bool
     * @throws Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author cjhao
     * @date 2022/5/17 16:18
     */
    public function createAuth($response)
    {
        //验证该微信是否授权过,用户open_id或者ounion_id，防止生成两个账号
//        $isAuth = UserAuth::where('openid','=',$response['openid'])
//            ->whereOr(function ($query) use($response) {
//                if(isset($response['unionid']) && !empty($response['unionid'])){
//                    $query->where('unionid', $response['unionid']);
//                }
//            })->find();
        //先检查openid是否有记录
        $isAuth = UserAuth::where('openid', '=', $response['openid'])->findOrEmpty();
        if (!$isAuth->isEmpty()) {
            throw new \Exception('该微信已经绑定，请切换微信授权登录');
        }

        if (isset($response['unionid']) && !empty($response['unionid'])) {
            //在用unionid找记录，防止生成两个账号，同个unionid的问题
            $userAuth = UserAuth::where(['unionid' => $response['unionid']])
                ->findOrEmpty();
            if (!$userAuth->isEmpty() && $userAuth->user_id != $response['user_id']) {
                throw new \Exception('该微信已经绑定，请切换微信授权登录');
            }
        }

        //如果没有授权，直接生成一条微信授权记录
        UserAuth::create([
            'user_id' => $response['user_id'],
            'openid' => $response['openid'],
            'unionid' => $response['unionid'] ?? '',
            'terminal' => $response['terminal'],
        ]);
        return true;
    }
}
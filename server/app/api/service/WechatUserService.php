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

namespace app\api\service;


use app\common\enum\YesNoEnum;
use app\common\model\user\{User, UserAuth};
use app\common\enum\user\UserTerminalEnum;
use app\common\service\{ConfigService, storage\Driver as StorageDriver};
use think\Exception;


/**
 * 用户功能类（主要微信登录后创建和更新用户）
 * Class WechatUserService
 * @package app\api\service
 */
class WechatUserService
{

    protected int $terminal = UserTerminalEnum::WECHAT_MMP;
    protected array $response = [];
    protected ?string $code = null;
    protected ?string $openid = null;
    protected ?string $unionid = null;
    protected ?string $nickname = null;
    protected ?string $headimgurl = null;
    protected User $user;


    public function __construct(array $response, int $terminal)
    {
        $this->terminal = $terminal;
        $this->setParams($response);
    }


    /**
     * @notes 设置微信返回的用户信息
     * @param $response
     * @author cjhao
     * @date 2021/8/2 11:49
     */
    private function setParams($response): void
    {
        $this->response = $response;
        $this->openid = $response['openid'];
        $this->unionid = $response['unionid'] ?? '';
        $this->nickname = $response['nickname'] ?? '';
        $this->headimgurl = $response['headimgurl'] ?? '';
    }


    /**
     * @notes 根据opendid或unionid获取系统用户信息
     * @return $this
     * @author 段誉
     * @date 2022/9/23 16:09
     */
    public function getResopnseByUserInfo(): self
    {
        $openid = $this->openid;
        $unionid = $this->unionid;

        $user = User::alias('u')
            ->field('u.id,u.sn,u.mobile,u.nickname,u.avatar,u.mobile,u.is_disable,u.is_new_user')
            ->join('user_auth au', 'au.user_id = u.id')
            ->where(function ($query) use ($openid, $unionid) {
                $query->whereOr(['au.openid' => $openid]);
                if (isset($unionid) && $unionid) {
                    $query->whereOr(['au.unionid' => $unionid]);
                }
            })
            ->findOrEmpty();

        $this->user = $user;
        return $this;
    }


    /**
     * @notes 获取用户信息
     * @param bool $isCheck 是否验证账号是否可用
     * @return array
     * @throws Exception
     * @author cjhao
     * @date 2021/8/3 11:42
     */
    public function getUserInfo($isCheck = true): array
    {
        if (!$this->user->isEmpty() && $isCheck) {
            $this->checkAccount();
        }
        if (!$this->user->isEmpty()) {
            $this->getToken();
        }
        return $this->user->toArray();
    }


    /**
     * @notes 校验账号
     * @throws Exception
     * @author 段誉
     * @date 2022/9/16 10:14
     */
    private function checkAccount()
    {
        if ($this->user->is_disable) {
            throw new Exception('您的账号异常，请联系客服。');
        }
    }


    /**
     * @notes 创建用户
     * @throws Exception
     * @author 段誉
     * @date 2022/9/16 10:06
     */
    private function createUser(): void
    {
        //设置头像
        if (empty($this->headimgurl)) {
            // 默认头像
            $defaultAvatar = config('project.default_image.user_avatar');
            $avatar = ConfigService::get('default_image', 'user_avatar', $defaultAvatar);
        } else {
            // 微信获取到的头像信息
            $avatar = $this->getAvatarByWechat();
        }

        $userSn = User::createUserSn();
        $this->user->sn = $userSn;
        $this->user->account = 'u' . $userSn;
        $this->user->nickname = "用户" . $userSn;
        $this->user->avatar = $avatar;
        $this->user->channel = $this->terminal;
        $this->user->is_new_user = YesNoEnum::YES;

        if ($this->terminal != UserTerminalEnum::WECHAT_MMP && !empty($this->nickname)) {
            $this->user->nickname = $this->nickname;
        }

        $this->user->save();

        UserAuth::create([
            'user_id' => $this->user->id,
            'openid' => $this->openid,
            'unionid' => $this->unionid,
            'terminal' => $this->terminal,
        ]);
    }


    /**
     * @notes 更新用户信息
     * @throws Exception
     * @author 段誉
     * @date 2022/9/16 10:06
     * @remark 该端没授权信息,重新写入一条该端的授权信息
     */
    private function updateUser(): void
    {
        // 无头像需要更新头像
        if (empty($this->user->avatar)) {
            $this->user->avatar = $this->getAvatarByWechat();
            $this->user->save();
        }

        $userAuth = UserAuth::where(['user_id' => $this->user->id, 'openid' => $this->openid])
            ->findOrEmpty();

        // 无该端授权信息，新增一条
        if ($userAuth->isEmpty()) {
            $userAuth->user_id = $this->user->id;
            $userAuth->openid = $this->openid;
            $userAuth->unionid = $this->unionid;
            $userAuth->terminal = $this->terminal;
            $userAuth->save();
        } else {
            if (empty($userAuth['unionid']) && !empty($this->unionid)) {
                $userAuth->unionid = $this->unionid;
                $userAuth->save();
            }
        }
    }


    /**
     * @notes 获取token
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author cjhao
     * @date 2021/8/2 16:45
     */
    private function getToken(): void
    {
        $user = UserTokenService::setToken($this->user->id, $this->terminal);
        $this->user->token = $user['token'];
    }


    /**
     * @notes 用户授权登录，
     * 如果用户不存在，创建用户；用户存在，更新用户信息，并检查该端信息是否需要写入
     * @return WechatUserService
     * @throws Exception
     * @author cjhao
     * @date 2021/8/2 16:35
     */
    public function authUserLogin(): self
    {
        if ($this->user->isEmpty()) {
            $this->createUser();
        } else {
            $this->updateUser();
        }
        return $this;
    }


    /**
     * @notes 处理从微信获取到的头像信息
     * @return string
     * @throws Exception
     * @author 段誉
     * @date 2022/9/16 9:50
     */
    public function getAvatarByWechat(): string
    {
        // 存储引擎
        $config = [
            'default' => ConfigService::get('storage', 'default', 'local'),
            'engine' => ConfigService::get('storage')
        ];

        $fileName = md5($this->openid . time()) . '.jpeg';

        if ($config['default'] == 'local') {
            // 本地存储
            $avatar = download_file($this->headimgurl, 'uploads/user/avatar/', $fileName);
        } else {
            // 第三方存储
            $avatar = 'uploads/user/avatar/' . $fileName;
            $StorageDriver = new StorageDriver($config);
            if (!$StorageDriver->fetch($this->headimgurl, $avatar)) {
                throw new Exception('头像保存失败:' . $StorageDriver->getError());
            }
        }
        return $avatar;
    }


}
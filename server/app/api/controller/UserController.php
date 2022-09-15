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
namespace app\api\controller;

use app\common\enum\notice\NoticeEnum;
use app\api\logic\UserLogic;

/**
 * 用户控制器
 * Class UserController
 * @package app\shopapi\controller
 */
class UserController extends BaseApiController
{
    public array $notNeedLogin = ['resetPasswordCaptcha', 'resetPassword'];

    /**
     * @notes 个人中心
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author cjhao
     * @date 2021/8/6 19:16
     */
    public function centre()
    {
        $data = (new UserLogic)->centre($this->userInfo);
        return $this->success('', $data);
    }


    /**
     * @notes 设置用户信息
     * @return \think\response\Json
     * @author cjhao
     * @date 2021/8/6 20:34
     */
    public function setInfo()
    {
        $params = (new SetUserInfoValidate())->post()->goCheck(null, ['id' => $this->userId]);
        (new UserLogic)->setInfo($this->userId, $params);
        return $this->success('操作成功', []);
    }

    /**
     * @notes 发送验证码 - 绑定手机号
     * @author Tab
     * @date 2021/8/25 17:35
     */
    public function bindMobileCaptcha()
    {
        $params = (new UserValidate())->post()->goCheck('bindMobileCaptcha');
        $code = mt_rand(1000, 9999);
        $result = event('Notice', [
            'scene_id' => NoticeEnum::BIND_MOBILE_CAPTCHA,
            'params' => [
                'user_id' => $this->userId,
                'code' => $code,
                'mobile' => $params['mobile']
            ]
        ]);
        if ($result[0] === true) {
            return $this->success('发送成功');
        }

        return $this->fail($result[0], [], 0, 1);
    }

    /**
     * @notes 发送验证码 - 变更手机号
     * @author Tab
     * @date 2021/8/25 17:35
     */
    public function changeMobileCaptcha()
    {
        $params = (new UserValidate())->post()->goCheck('changeMobileCaptcha');
        $code = mt_rand(1000, 9999);
        $result = event('Notice', [
            'scene_id' => NoticeEnum::CHANGE_MOBILE_CAPTCHA,
            'params' => [
                'user_id' => $this->userId,
                'code' => $code,
                'mobile' => $params['mobile']
            ]
        ]);
        if ($result[0] === true) {
            return $this->success('发送成功');
        }

        return $this->fail($result[0], [], 0, 1);
    }

    /**
     * @notes 绑定手机号
     * @return \think\response\Json
     * @author Tab
     * @date 2021/8/25 17:46
     */
    public function bindMobile()
    {
        $params = (new UserValidate())->post()->goCheck('bindMobile');
        $params['id'] = $this->userId;
        $result = UserLogic::bindMobile($params);
        if ($result) {
            return $this->success('绑定成功', [], 1, 1);
        }
        return $this->fail(UserLogic::getError());
    }


    /**
     * @notes 发送验证码 - 重置登录密码
     * @author Tab
     * @date 2021/8/25 16:33
     */
    public function resetPasswordCaptcha()
    {
        $params = (new UserValidate())->post()->goCheck('resetPasswordCaptcha');
        $code = mt_rand(1000, 9999);
        $result = event('Notice', [
            'scene_id' => NoticeEnum::FIND_LOGIN_PASSWORD_CAPTCHA,
            'params' => [
                'user_id' => $this->userId,
                'code' => $code,
                'mobile' => $params['mobile']
            ]
        ]);
        if ($result[0] === true) {
            return $this->success('发送成功');
        }
        return $this->fail($result[0], [], 0, 1);
    }

    /**
     * @notes 重置登录密码
     * @return \think\response\Json
     * @author Tab
     * @date 2021/8/25 16:35
     */
    public function resetPassword()
    {
        $params = (new UserValidate())->post()->goCheck('resetPassword');
        $result = UserLogic:: resetPassword($params);
        if ($result) {
            return $this->success('重置登录密码成功', [], 1, 1);
        }
        return $this->fail(UserLogic::getError());
    }


    /**
     * @notes 用户信息
     * @return \think\response\Json
     * @author Tab
     * @date 2021/8/25 17:18
     */
    public function info()
    {
        $result = UserLogic::info($this->userId);
        return $this->data($result);
    }


    /**
     * @notes 获取服务协议
     * @return \think\response\Json
     * @author Tab
     * @date 2021/8/24 16:44
     */
    public function getServiceAgreement()
    {
        $result = UserLogic::getServiceAgreement();
        return $this->data($result);
    }

    /**
     * @notes 获取隐私政策
     * @return \think\response\Json
     * @author Tab
     * @date 2021/8/24 16:44
     */
    public function getPrivacyPolicy()
    {
        $result = UserLogic::getPrivacyPolicy();
        return $this->data($result);
    }


    /**
     * @notes 设置登录密码
     * @return \think\response\Json
     * @author Tab
     * @date 2021/10/22 18:09
     */
    public function setPassword()
    {
        $params = (new UserValidate())->post()->goCheck('setPassword');
        $params['user_id'] = $this->userId;
        $result = UserLogic::setPassword($params);
        if ($result) {
            return $this->success('设置成功', [], 1, 1);
        }
        return $this->fail(UserLogic::getError());
    }

    /**
     * @notes 修改登录密码
     * @return \think\response\Json
     * @author Tab
     * @date 2021/10/22 18:09
     */
    public function changePassword()
    {
        $params = (new UserValidate())->post()->goCheck('changePassword');
        $params['user_id'] = $this->userId;
        $result = UserLogic::changePassword($params);
        if ($result) {
            return $this->success('修改成功', [], 1, 1);
        }
        return $this->fail(UserLogic::getError());
    }

    /**
     * @notes 判断用户是否设置登录密码
     * @return mixed
     * @author Tab
     * @date 2021/10/22 18:24
     */
    public function hasPassword()
    {
        $result = UserLogic::hasPassword($this->userId);
        return $this->data([
            'has_password' => $result
        ]);
    }


}
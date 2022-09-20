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


use app\api\logic\UserLogic;
use app\api\validate\PasswordValidate;

/**
 * 用户控制器
 * Class UserController
 * @package app\api\controller
 */
class UserController extends BaseApiController
{
    public array $notNeedLogin = ['resetPassword'];


    /**
     * @notes 获取个人中心
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/16 18:19
     */
    public function center()
    {
        $data = UserLogic::center($this->userId);
        return $this->success('', $data);
    }


    /**
     * @notes 获取个人信息
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/9/20 19:46
     */
    public function info()
    {
        $result = UserLogic::info($this->userId);
        return $this->data($result);
    }



    /**
     * @notes 重置密码
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/9/16 18:06
     */
    public function resetPassword()
    {
        $params = (new PasswordValidate())->post()->goCheck('resetPassword');
        $result = UserLogic::resetPassword($params);
        if (true === $result) {
            return $this->success('操作成功', [], 1, 1);
        }
        return $this->fail(UserLogic::getError());
    }


    /**
     * @notes 修改密码
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/9/20 19:16
     */
    public function changePassword()
    {
        $params = (new PasswordValidate())->post()->goCheck('changePassword');
        $result = UserLogic::changePassword($params, $this->userId);
        if (true === $result) {
            return $this->success('操作成功', [], 1, 1);
        }
        return $this->fail(UserLogic::getError());
    }
}
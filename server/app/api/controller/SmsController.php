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


use app\api\logic\SmsLogic;
use app\api\validate\SendSmsValidate;


/**
 * 短信
 * Class SmsController
 * @package app\api\controller
 */
class SmsController extends BaseApiController
{

    public array $notNeedLogin = ['sendCode'];


    /**
     * @notes 发送短信验证码
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/9/15 16:17
     */
    public function sendCode()
    {
        $params = (new SendSmsValidate())->post()->goCheck();
        $result = SmsLogic::sendCode($params);
        if (true === $result) {
            return $this->success('发送成功');
        }
        return $this->fail(SmsLogic::getError());
    }

}
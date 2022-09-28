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


use app\common\validate\BaseValidate;


/**
 * 短信验证
 * Class SmsValidate
 * @package app\api\validate
 */
class SendSmsValidate extends BaseValidate
{

    protected $rule = [
        'mobile' => 'require|mobile',
        'scene' => 'require',
    ];

    protected $message = [
        'mobile.require' => '请输入手机号',
        'mobile.mobile' => '请输入正确手机号',
        'scene.require' => '请输入场景值',
    ];
}
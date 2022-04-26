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

namespace app\adminapi\validate\channel;

use app\common\validate\BaseValidate;

/**
 * 公众号设置
 * Class OfficialAccountSettingValidate
 * @package app\adminapi\validate\channel
 */
class OfficialAccountSettingValidate extends BaseValidate
{
    protected $rule = [
        'app_id' => 'require',
        'app_secret' => 'require',
        'encryption_type' => 'require|in:1,2,3',
    ];

    protected $message = [
        'app_id.require' => '请填写AppID',
        'app_secret.require' => '请填写AppSecret',
        'encryption_type.require' => '请选择消息加密方式',
        'encryption_type.in' => '消息加密方式状态值错误',
    ];
}
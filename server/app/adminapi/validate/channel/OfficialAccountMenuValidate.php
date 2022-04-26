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
 * 微信公众号菜单验证器
 * Class OfficialAccountMenuValidate
 * @package app\adminapi\validate\wechat
 */
class OfficialAccountMenuValidate extends BaseValidate
{
    protected $rule = [
        'menu' => 'require|array'
    ];

    protected $message = [
        'menu.require' => '请先设置菜单',
        'menu.array' =>  '菜单须为数组格式'
    ];
}
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
 * H5设置验证器
 * Class HFiveSettingValidate
 * @package app\adminapi\validate\setting\h5
 */
class WebPageSettingValidate extends BaseValidate
{
    protected $rule = [
        'status' => 'require|in:0,1'
    ];

    protected $message = [
        'status.require' => '请选择启用状态',
        'status.in' => '启用状态值有误',
    ];
}
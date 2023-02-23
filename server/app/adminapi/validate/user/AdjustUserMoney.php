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

namespace app\adminapi\validate\user;

use app\common\enum\user\AccountLogEnum;
use app\common\model\user\User;
use app\common\validate\BaseValidate;

/**
 * 调整用户钱包验证器
 * Class AdjustUserMoney
 * @package app\adminapi\validate\user
 */
class AdjustUserMoney extends BaseValidate
{

    protected $rule = [
        'user_id' => 'require',
        'action' => 'require|in:' . AccountLogEnum::INC . ',' .AccountLogEnum::DEC,
        'num' => 'require|gt:0|checkMoney',
        'remark' => 'max:128',
    ];

    protected $message = [
        'id.require' => '请选择用户',
        'action.require' => '请选择调整类型',
        'action.in' => '调整类型错误',
        'num.require' => '请输入调整数量',
        'num.gt' => '调整余额必须大于零',
        'remark' => '备注不可超过128个符号',
    ];


    protected function checkMoney($vaule, $rule, $data)
    {
        $user = User::find($data['user_id']);
        if (empty($user)) {
            return '用户不存在';
        }

        if (1 == $data['action']) {
            return true;
        }

        $surplusMoeny = $user->user_money - $vaule;
        if ($surplusMoeny < 0) {
            return '用户可用余额仅剩' . $user->user_money;
        }

        return true;
    }


}
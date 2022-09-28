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


use app\common\model\user\User;
use app\common\validate\BaseValidate;


/**
 * 设置用户信息验证
 * Class SetUserInfoValidate
 * @package app\api\validate
 */
class SetUserInfoValidate extends BaseValidate
{
    protected $rule = [
        'field' => 'require|checkField',
        'value' => 'require',
    ];

    protected $message = [
        'field.require' => '参数缺失',
        'value.require' => '值不存在',
    ];


    /**
     * @notes 校验字段内容
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2022/9/21 17:01
     */
    protected function checkField($value, $rule, $data)
    {
        $allowField = [
            'nickname', 'account', 'sex', 'avatar', 'real_name',
        ];

        if (!in_array($value, $allowField)) {
            return '参数错误';
        }

        if ($value == 'account') {
            $user = User::where([
                ['account', '=', $data['value']],
                ['id', '<>', $data['id']]
            ])->findOrEmpty();
            if (!$user->isEmpty()) {
                return '账号已被使用!';
            }
        }

        return true;
    }


}
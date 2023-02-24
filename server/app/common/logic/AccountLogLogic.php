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

namespace app\common\logic;

use app\common\enum\user\AccountLogEnum;
use app\common\model\user\UserAccountLog;
use app\common\model\user\User;

/**
 * 账户流水记录逻辑层
 * Class AccountLogLogic
 * @package app\common\logic
 */
class AccountLogLogic extends BaseLogic
{

    /**
     * @notes 账户流水记录
     * @param $userId
     * @param $changeType
     * @param $action
     * @param $changeAmount
     * @param string $sourceSn
     * @param string $remark
     * @param array $extra
     * @return UserAccountLog|false|\think\Model
     * @author 段誉
     * @date 2023/2/23 12:03
     */
    public static function add($userId, $changeType, $action, $changeAmount, string $sourceSn = '', string $remark = '',  array $extra = [])
    {
        $user = User::findOrEmpty($userId);
        if($user->isEmpty()) {
            return false;
        }

        $changeObject = AccountLogEnum::getChangeObject($changeType);
        if(!$changeObject) {
            return false;
        }

        switch ($changeObject) {
            // 用户余额
            case AccountLogEnum::UM:
                $left_amount = $user->user_money;
                break;
            // 其他
        }

        $data = [
            'sn' => generate_sn(UserAccountLog::class, 'sn', 20),
            'user_id' => $userId,
            'change_object' => $changeObject,
            'change_type' => $changeType,
            'action' => $action,
            'left_amount' => $left_amount,
            'change_amount' => $changeAmount,
            'source_sn' => $sourceSn,
            'remark' => $remark,
            'extra' => $extra ? json_encode($extra, JSON_UNESCAPED_UNICODE) : '',
        ];
        return UserAccountLog::create($data);
    }
}
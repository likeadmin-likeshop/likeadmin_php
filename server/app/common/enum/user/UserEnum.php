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

namespace app\common\enum\user;

/**
 * 管理后台登录终端
 * Class terminalEnum
 * @package app\common\enum
 */
class UserEnum
{

    /**
     * 性别
     * SEX_OTHER = 未知
     * SEX_MEN =  男
     * SEX_WOMAN = 女
     */
    const SEX_OTHER = 0;
    const SEX_MEN = 1;
    const SEX_WOMAN = 2;


    /**
     * @notes 性别描述
     * @param bool $from
     * @return string|string[]
     * @author 段誉
     * @date 2022/9/7 15:05
     */
    public static function getSexDesc($from = true)
    {
        $desc = [
            self::SEX_OTHER => '未知',
            self::SEX_MEN => '男',
            self::SEX_WOMAN => '女',
        ];
        if (true === $from) {
            return $desc;
        }
        return $desc[$from] ?? '';
    }
}
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


namespace app\common\enum;

/**
 * 通过枚举类，枚举只有两个值的时候使用
 * Class YesNoEnum
 * @package app\common\enum
 */
class YesNoEnum
{
    const YES = 1;
    const NO = 0;

    /**
     * @notes 获取禁用状态
     * @param bool $value
     * @return string|string[]
     * @author 令狐冲
     * @date 2021/7/8 19:02
     */
    public static function getDisableDesc($value = true)
    {
        $data = [
            self::YES => '禁用',
            self::NO => '正常'
        ];
        if ($value === true) {
            return $data;
        }
        return $data[$value];
    }
}
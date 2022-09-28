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
class UserTerminalEnum
{
    //const OTHER = 0; //其他来源
    const WECHAT_MMP = 1; //微信小程序
    const WECHAT_OA  = 2; //微信公众号
    const H5         = 3;//手机H5登录
    const PC         = 4;//电脑PC
    const IOS        = 5;//苹果app
    const ANDROID    = 6;//安卓app


    const ALL_TERMINAL = [
        self::WECHAT_MMP,
        self::WECHAT_OA,
        self::H5,
        self::PC,
        self::IOS,
        self::ANDROID,
    ];

    /**
     * @notes 获取终端
     * @param bool $from
     * @return array|mixed|string
     * @author cjhao
     * @date 2021/7/30 18:09
     */
    public static function getTermInalDesc($from = true)
    {
        $desc = [
            self::WECHAT_MMP    => '微信小程序',
            self::WECHAT_OA     => '微信公众号',
            self::H5            => '手机H5',
            self::PC            => '电脑PC',
            self::IOS           => '苹果APP',
            self::ANDROID       => '安卓APP',
        ];
        if(true === $from){
            return $desc;
        }
        return $desc[$from] ?? '';
    }
}
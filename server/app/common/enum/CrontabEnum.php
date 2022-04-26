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
 * 定时任务枚举
 * Class CrontabEnum
 * @package app\common\enum
 */
class CrontabEnum
{
    /**
     * 类型
     * CRONTAB 定时任务
     */
    const CRONTAB = 1;
    const DAEMON = 2;

    /**
     * 定时任务状态
     */
    const START = 1;
    const STOP = 2;
    const ERROR = 3;
}
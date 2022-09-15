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
namespace app\common\enum\notice;

/**
 * 短信枚举
 * Class SmsEnum
 * @package app\common\enum
 */
class SmsEnum
{
    /**
     * 发送状态
     */
    const SEND_ING = 0;
    const SEND_SUCCESS = 1;
    const SEND_FAIL = 2;

    /**
     * 短信平台
     */
    const ALI = 1;
    const TENCENT = 2;


    /**
     * @notes 获取短信平台名称
     * @param $value
     * @return string
     * @author 段誉
     * @date 2022/8/5 11:10
     */
    public static function getNameDesc($value)
    {
        $desc = [
            'ALI' => '阿里云短信',
            'TENCENT' => '腾讯云短信',
        ];
        return $desc[$value] ?? '';
    }

}
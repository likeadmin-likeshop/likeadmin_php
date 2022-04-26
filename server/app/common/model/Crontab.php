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

namespace app\common\model;

use app\common\enum\CrontabEnum;
use think\model\concern\SoftDelete;

/**
 * 定时任务模型
 * Class Crontab
 * @package app\common\model
 */
class Crontab extends BaseModel
{
    use SoftDelete;

    protected $deleteTime = 'delete_time';

    protected $name = 'dev_crontab';


    /**
     * @notes 类型获取器
     * @param $value
     * @return string
     * @author 段誉
     * @date 2022/3/29 12:05
     */
    public function getTypeDescAttr($value)
    {
        $desc = [
            CrontabEnum::CRONTAB => '定时任务',
            CrontabEnum::DAEMON => '守护进程',
        ];
        return $desc[$value] ?? '';
    }


    /**
     * @notes 状态获取器
     * @param $value
     * @return string
     * @author 段誉
     * @date 2022/3/29 12:06
     */
    public function getStatusDescAttr($value)
    {
        $desc = [
            CrontabEnum::START => '运行',
            CrontabEnum::STOP => '停止',
            CrontabEnum::ERROR => '错误',
        ];
        return $desc[$value] ?? '';
    }


    /**
     * @notes 最后执行时间获取器
     * @param $value
     * @return string
     * @author 段誉
     * @date 2022/3/29 12:06
     */
    public function getLastTimeAttr($value)
    {
        return empty($value) ? '' : date('Y-m-d H:i:s', $value);
    }
}
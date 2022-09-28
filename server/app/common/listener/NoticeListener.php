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
namespace app\common\listener;

use app\common\logic\NoticeLogic;
use think\facade\Log;

/**
 * 通知事件监听
 * Class NoticeListener
 * @package app\listener
 */
class NoticeListener
{
    public function handle($params)
    {
        try {
            if (empty($params['scene_id'])) {
                throw new \Exception('场景ID不能为空');
            }
            // 根据不同的场景发送通知
            $result = NoticeLogic::noticeByScene($params);
            if (false === $result) {
                throw new \Exception(NoticeLogic::getError());
            }
            return true;
        } catch (\Exception $e) {
            Log::write('通知发送失败:'.$e->getMessage());
            return $e->getMessage();
        }
    }
}
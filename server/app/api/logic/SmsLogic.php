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

namespace app\api\logic;

use app\common\enum\notice\NoticeEnum;
use app\common\logic\BaseLogic;


/**
 * 短信逻辑
 * Class SmsLogic
 * @package app\api\logic
 */
class SmsLogic extends BaseLogic
{

    /**
     * @notes 发送验证码
     * @param $params
     * @return false|mixed
     * @author 段誉
     * @date 2022/9/15 16:17
     */
    public static function sendCode($params)
    {
        try {
            $scene = NoticeEnum::getSceneByTag($params['scene']);
            if (empty($scene)) {
                throw new \Exception('场景值异常');
            }

            $result = event('Notice',  [
                'scene_id' => $scene,
                'params' => [
                    'mobile' => $params['mobile'],
                    'code' => mt_rand(1000, 9999),
                ]
            ]);

            return $result[0];

        } catch (\Exception $e) {
            self::$error = $e->getMessage();
            return false;
        }
    }

}
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
namespace app\adminapi\logic\decorate;

use app\common\logic\BaseLogic;
use app\common\model\decorate\DecorateConfig;


/**
 * 装修配置
 * Class DecorateConfigLogic
 * @package app\adminapi\logic\theme
 */
class DecorateConfigLogic extends BaseLogic
{

    /**
     * @notes 获取装修配置
     * @param $type
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/6 9:56
     */
    public static function getContent($type): array
    {
        $decorate = DecorateConfig::where(['type' => $type])->field('id,content')->find()->toArray();
        return $decorate['content'] ?? [];
    }


    /**
     * @notes 设置装修配置
     * @param array $params
     * @return bool
     * @author 段誉
     * @date 2022/9/6 9:55
     */
    public static function setContent(array $params): bool
    {
        $decorate = DecorateConfig::where(['type' => $params['type']])->findOrEmpty();
        $decorate->type = $params['type'];
        $decorate->content = $params['content'];
        $decorate->save();
        return true;
    }

}
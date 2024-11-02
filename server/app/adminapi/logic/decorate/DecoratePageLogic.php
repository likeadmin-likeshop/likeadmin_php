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
use app\common\model\decorate\DecoratePage;


/**
 * 装修页面
 * Class DecoratePageLogic
 * @package app\adminapi\logic\theme
 */
class DecoratePageLogic extends BaseLogic
{


    /**
     * @notes 获取详情
     * @param $id
     * @return array
     * @author 段誉
     * @date 2022/9/14 18:41
     */
    public static function getDetail($id)
    {
        return DecoratePage::findOrEmpty($id)->toArray();
    }


    /**
     * @notes 保存装修配置
     * @param $params
     * @return bool
     * @author 段誉
     * @date 2022/9/15 9:37
     */
    public static function save($params)
    {
        $pageData = DecoratePage::where(['id' => $params['id']])->findOrEmpty();
        if ($pageData->isEmpty()) {
            self::$error = '信息不存在';
            return false;
        }
        DecoratePage::update([
            'id' => $params['id'],
            'type' => $params['type'],
            'data' => $params['data'],
            'meta' => $params['meta'] ?? '',
        ]);
        return true;
    }



}
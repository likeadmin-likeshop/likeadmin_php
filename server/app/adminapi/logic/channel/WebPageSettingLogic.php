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
namespace app\adminapi\logic\channel;

use app\common\logic\BaseLogic;
use app\common\service\ConfigService;

/**
 * H5设置逻辑层
 * Class HFiveSettingLogic
 * @package app\adminapi\logic\setting\h5
 */
class WebPageSettingLogic extends BaseLogic
{
    /**
     * @notes 获取H5设置
     * @return array
     * @author 段誉
     * @date 2022/3/29 10:34
     */
    public static function getConfig()
    {
        $config = [
            // 渠道状态 0-关闭 1-开启
            'status' => ConfigService::get('web_page', 'status', 1),
            // 关闭后渠道后访问页面 0-空页面 1-自定义链接
            'page_status' => ConfigService::get('web_page', 'page_status', 0),
            // 自定义链接
            'page_url' => ConfigService::get('web_page', 'page_url', ''),
            'url' => request()->domain() . '/mobile'
        ];
        return $config;
    }


    /**
     * @notes H5设置
     * @param $params
     * @author 段誉
     * @date 2022/3/29 10:34
     */
    public static function setConfig($params)
    {
        ConfigService::set('web_page', 'status', $params['status']);
        ConfigService::set('web_page', 'page_status', $params['page_status']);
        ConfigService::set('web_page', 'page_url', $params['page_url']);
    }
}
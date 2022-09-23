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

namespace app\adminapi\logic\notice;

use app\common\enum\notice\SmsEnum;
use app\common\logic\BaseLogic;
use app\common\service\ConfigService;

/**
 * 短信配置逻辑层
 * Class SmsConfigLogic
 * @package app\adminapi\logic\notice
 */
class SmsConfigLogic extends BaseLogic
{
    /**
     * @notes 获取短信配置
     * @return array
     * @author 段誉
     * @date 2022/3/29 11:37
     */
    public static function getConfig()
    {
        $config = [
            ConfigService::get('sms', 'ali', ['type' => 'ali', 'name' => '阿里云短信', 'status' => 1]),
            ConfigService::get('sms', 'tencent', ['type' => 'tencent', 'name' => '腾讯云短信', 'status' => 0]),
        ];
        return $config;
    }


    /**
     * @notes 短信配置
     * @param $params
     * @return bool|void
     * @author 段誉
     * @date 2022/3/29 11:37
     */
    public static function setConfig($params)
    {
        $type = $params['type'];
        $params['name'] = self::getNameDesc(strtoupper($type));
        ConfigService::set('sms', $type, $params);
        $default = ConfigService::get('sms', 'engine', false);
        if ($params['status'] == 1 && $default === false) {
            // 启用当前短信配置 并 设置当前短信配置为默认
            ConfigService::set('sms', 'engine', strtoupper($type));
            return true;
        }
        if ($params['status'] == 1 && $default != strtoupper($type)) {
            // 找到默认短信配置
            $defaultConfig = ConfigService::get('sms', strtolower($default));
            // 状态置为禁用 并 更新
            $defaultConfig['status'] = 0;
            ConfigService::set('sms', strtolower($default), $defaultConfig);
            // 设置当前短信配置为默认
            ConfigService::set('sms', 'engine', strtoupper($type));
            return true;
        }
    }


    /**
     * @notes 查看短信配置详情
     * @param $params
     * @return array|int|mixed|string|null
     * @author 段誉
     * @date 2022/3/29 11:37
     */
    public static function detail($params)
    {
        $default = [];
        switch ($params['type']) {
            case 'ali':
                $default = [
                    'sign' => '',
                    'app_key' => '',
                    'secret_key' => '',
                    'status' => 1,
                    'name' => '阿里云短信',
                ];
                break;
            case 'tencent':
                $default = [
                    'sign' => '',
                    'app_id' => '',
                    'secret_key' => '',
                    'status' => 0,
                    'secret_id' => '',
                    'name' => '腾讯云短信',
                ];
                break;
        }
        $result = ConfigService::get('sms', $params['type'], $default);
        $result['status'] = intval($result['status'] ?? 0);
        return $result;
    }


    /**
     * @notes 获取短信平台名称
     * @param $value
     * @return string
     * @author 段誉
     * @date 2022/3/29 11:37
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
<?php
// +----------------------------------------------------------------------
// | likeshop开源商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop系列产品在gitee、github等公开渠道开源版本可免费商用，未经许可不能去除前后端官方版权标识
// |  likeshop系列产品收费版本务必购买商业授权，购买去版权授权后，方可去除前后端官方版权标识
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | likeshop团队版权所有并拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshop.cn.team
// +----------------------------------------------------------------------

namespace app\adminapi\logic\setting;

use app\common\logic\BaseLogic;
use app\common\service\ConfigService;
use app\common\service\FileService;

/**
 * 客服设置逻辑
 * Class CustomerServiceLogic
 * @package app\adminapi\logic\setting
 */
class CustomerServiceLogic extends BaseLogic
{
    /**
     * @notes 获取客服设置
     * @return array
     * @author ljj
     * @date 2022/2/15 12:05 下午
     */
    public static function getConfig()
    {
        $qrCode = ConfigService::get('customer_service', 'qr_code');
        $qrCode = empty($qrCode) ? '' : FileService::getFileUrl($qrCode);
        $config = [
            'qr_code' => $qrCode,
            'wechat' => ConfigService::get('customer_service', 'wechat', ''),
            'phone' => ConfigService::get('customer_service', 'phone', ''),
            'service_time' => ConfigService::get('customer_service', 'service_time', ''),
        ];
        return $config;
    }

    /**
     * @notes 设置客服设置
     * @param $params
     * @author ljj
     * @date 2022/2/15 12:11 下午
     */
    public static function setConfig($params)
    {
        $allowField = ['qr_code','wechat','phone','service_time'];
        foreach($params as $key => $value) {
            if(in_array($key, $allowField)) {
                ConfigService::set('customer_service', $key, $value);
            }
        }
    }
}
<?php
// +----------------------------------------------------------------------
// | likeshop100%开源免费商用商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | 商业版本务必购买商业授权，以免引起法律纠纷
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshopTeam
// +----------------------------------------------------------------------

namespace app\adminapi\logic\recharge;


use app\common\logic\BaseLogic;
use app\common\service\ConfigService;


/**
 * 充值逻辑层
 * Class RechargeLogic
 * @package app\adminapi\logic\recharge
 */
class RechargeLogic extends BaseLogic
{

    /**
     * @notes 获取充值设置
     * @return array
     * @author 段誉
     * @date 2023/2/22 16:54
     */
    public static function getConfig()
    {
        $config = [
            'status' => ConfigService::get('recharge', 'status', 0),
            'min_amount' => ConfigService::get('recharge', 'min_amount', 0)
        ];

        return $config;
    }


    /**
     * @notes 充值设置
     * @param $params
     * @return bool
     * @author 段誉
     * @date 2023/2/22 16:54
     */
    public static function setConfig($params)
    {
        try {
            if(isset($params['status'])) {
                ConfigService::set('recharge', 'status', $params['status']);
            }
            if(isset($params['min_amount'])) {
                ConfigService::set('recharge', 'min_amount', $params['min_amount']);
            }
            return true;
        } catch(\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }




}
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

namespace app\adminapi\logic\setting\pay;


use app\common\enum\PayEnum;
use app\common\logic\BaseLogic;
use app\common\model\pay\PayConfig;

/**
 * 支付配置
 * Class PayConfigLogic
 * @package app\adminapi\logic\setting\pay
 */
class PayConfigLogic extends BaseLogic
{

    /**
     * @notes 设置配置
     * @param $params
     * @return bool
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/2/23 16:16
     */
    public static function setConfig($params)
    {
        $pay_config = PayConfig::find($params['id']);

        $config = '';
        if ($pay_config['pay_way'] == PayEnum::WECHAT_PAY) {
            $config = [
                'interface_version' => $params['interface_version'],
                'merchant_type' => $params['merchant_type'],
                'mch_id' => $params['mch_id'],
                'pay_sign_key' => $params['pay_sign_key'],
                'apiclient_cert' => $params['apiclient_cert'],
                'apiclient_key' => $params['apiclient_key'],
            ];
        }
        if ($pay_config['pay_way'] == PayEnum::ALI_PAY) {
            $config = [
                'mode' => $params['mode'],
                'merchant_type' => $params['merchant_type'],
                'app_id' => $params['app_id'],
                'private_key' => $params['private_key'],
                'ali_public_key' => $params['ali_public_key'],
            ];
        }

        $pay_config->name = $params['name'];
        $pay_config->icon = $params['icon'];
        $pay_config->sort = $params['sort'];
        $pay_config->config = $config;
        $pay_config->remark = $params['remark'] ?? '';
        return $pay_config->save();
    }


    /**
     * @notes 获取配置
     * @param $params
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/2/23 16:16
     */
    public static function getConfig($params)
    {
        $payConfig = PayConfig::find($params['id'])->toArray();
        $payConfig['domain'] = request()->domain();
        return $payConfig;
    }

}

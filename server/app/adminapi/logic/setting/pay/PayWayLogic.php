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
use app\common\enum\YesNoEnum;
use app\common\logic\BaseLogic;
use app\common\model\pay\PayConfig;
use app\common\model\pay\PayWay;
use app\common\service\FileService;

/**
 * 支付方式
 * Class PayWayLogic
 * @package app\adminapi\logic\setting\pay
 */
class PayWayLogic extends BaseLogic
{

    /**
     * @notes 获取支付方式
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/2/23 16:25
     */
    public static function getPayWay()
    {
        $payWay = PayWay::select()->append(['pay_way_name'])
            ->toArray();

        if (empty($payWay)) {
            return [];
        }

        $lists = [];
        for ($i = 1; $i <= max(array_column($payWay, 'scene')); $i++) {
            foreach ($payWay as $val) {
                if ($val['scene'] == $i) {
                    $val['icon'] = FileService::getFileUrl(PayConfig::where('id', $val['pay_config_id'])->value('icon'));
                    $lists[$i][] = $val;
                }
            }
        }

        return $lists;
    }


    /**
     * @notes 设置支付方式
     * @param $params
     * @return bool|string
     * @throws \Exception
     * @author 段誉
     * @date 2023/2/23 16:26
     */
    public static function setPayWay($params)
    {
        $payWay = new PayWay;
        $data = [];
        foreach ($params as $key => $value) {
            $isDefault = array_column($value, 'is_default');
            $isDefaultNum = array_count_values($isDefault);
            $status = array_column($value, 'status');
            $sceneName = PayEnum::getPaySceneDesc($key);
            if (!in_array(YesNoEnum::YES, $isDefault)) {
                return $sceneName . '支付场景缺少默认支付';
            }
            if ($isDefaultNum[YesNoEnum::YES] > 1) {
                return $sceneName . '支付场景的默认值只能存在一个';
            }
            if (!in_array(YesNoEnum::YES, $status)) {
                return $sceneName . '支付场景至少开启一个支付状态';
            }

            foreach ($value as $val) {
                $result = PayWay::where('id', $val['id'])->findOrEmpty();
                if ($result->isEmpty()) {
                    continue;
                }
                if ($val['is_default'] == YesNoEnum::YES && $val['status'] == YesNoEnum::NO) {
                    return $sceneName . '支付场景的默认支付未开启支付状态';
                }
                $data[] = [
                    'id' => $val['id'],
                    'is_default' => $val['is_default'],
                    'status' => $val['status'],
                ];
            }
        }
        $payWay->saveAll($data);
        return true;
    }
}


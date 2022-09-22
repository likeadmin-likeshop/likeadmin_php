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


use app\common\logic\BaseLogic;
use app\common\service\ConfigService;

/**
 * 搜索逻辑
 * Class SearchLogic
 * @package app\api\logic
 */
class SearchLogic extends BaseLogic
{

    /**
     * @notes 热搜列表
     * @return array
     * @author 段誉
     * @date 2022/9/21 20:06
     */
    public static function hotLists()
    {
        // 功能状态 0-关闭 1-开启
        $status = ConfigService::get('hot_search', 'status', 1);
        // 热门搜索数据
        $data = ConfigService::get('hot_search', 'data', []);

        if ($status == 1 && !empty($data)) {
            $data = array_map(function ($value) {
                if (isset($value['sort'])) {
                    $value['sort'] = intval($value['sort']);
                }
                return $value;
            }, $data);
            $sort = array_column($data, 'sort');
            array_multisort($sort, SORT_DESC, $data);
        }

        return [
            'status' => $status,
            'data' => $data
        ];
    }

}
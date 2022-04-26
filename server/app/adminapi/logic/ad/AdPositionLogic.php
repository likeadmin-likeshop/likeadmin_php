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

namespace app\adminapi\logic\ad;

use app\common\logic\BaseLogic;
use app\common\model\ad\AdPosition;

/**
 * 广告位置逻辑
 * Class AdPositionLogic
 * @package app\adminapi\logic\ad
 */
class AdPositionLogic extends BaseLogic
{
    /**
     * @notes 添加广告位
     * @param $params
     * @return bool
     * @author ljj
     * @date 2022/2/14 5:04 下午
     */
    public function add($params)
    {
        AdPosition::create([
            'name' => $params['name'],
            'status' => $params['status'],
        ]);

        return true;
    }

    /**
     * @notes 查看广告位详情
     * @param $id
     * @return array
     * @author ljj
     * @date 2022/2/14 5:08 下午
     */
    public function detail($id)
    {
        return AdPosition::where('id',$id)->findOrEmpty()->toArray();
    }

    /**
     * @notes 编辑广告位
     * @param $params
     * @return bool
     * @author ljj
     * @date 2022/2/14 5:13 下午
     */
    public function edit($params)
    {
        AdPosition::update([
            'name' => $params['name'],
            'status' => $params['status'],
        ],['id'=>$params['id']]);

        return true;
    }

    /**
     * @notes 删除广告位
     * @param $id
     * @return bool
     * @author ljj
     * @date 2022/2/14 5:28 下午
     */
    public function del($id)
    {
        AdPosition::destroy($id);
        return true;
    }

    /**
     * @notes 修改广告位状态
     * @param $params
     * @return bool
     * @author ljj
     * @date 2022/2/14 5:32 下午
     */
    public function status($params)
    {
        AdPosition::update([
            'status' => $params['status'],
        ],['id'=>$params['id']]);

        return true;
    }
}
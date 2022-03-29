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
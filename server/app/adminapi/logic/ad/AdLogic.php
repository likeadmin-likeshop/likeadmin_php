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

use app\common\enum\DefaultEnum;
use app\common\logic\BaseLogic;
use app\common\model\ad\Ad;

/**
 * 广告逻辑
 * Class AdLogic
 * @package app\adminapi\logic\ad
 */
class AdLogic extends BaseLogic
{
    /**
     * @notes 添加广告
     * @param $params
     * @return bool
     * @author ljj
     * @date 2022/2/14 7:00 下午
     */
    public function add($params)
    {
        Ad::create([
            'name' => $params['name'],
            'pid' => $params['pid'],
            'image' => $params['image'],
            'link_type' => $params['link_type'],
            'link_address' => $params['link_address'],
            'status' => $params['status'],
            'sort' => $params['sort'] ?? DefaultEnum::SORT,
        ]);

        return true;
    }

    /**
     * @notes 查看广告详情
     * @param $id
     * @return array
     * @author ljj
     * @date 2022/2/15 10:14 上午
     */
    public function detail($id)
    {
        return Ad::where('id',$id)->findOrEmpty()->toArray();
    }

    /**
     * @notes 编辑广告
     * @param $params
     * @return bool
     * @author ljj
     * @date 2022/2/15 10:24 上午
     */
    public function edit($params)
    {
        Ad::update([
            'name' => $params['name'],
            'pid' => $params['pid'],
            'image' => $params['image'],
            'link_type' => $params['link_type'],
            'link_address' => $params['link_address'],
            'status' => $params['status'],
            'sort' => $params['sort'] ?? DefaultEnum::SORT,
        ],['id'=>$params['id']]);

        return true;
    }

    /**
     * @notes 删除广告
     * @param $id
     * @return bool
     * @author ljj
     * @date 2022/2/15 10:32 上午
     */
    public function del($id)
    {
        Ad::destroy($id);
        return true;
    }

    /**
     * @notes 修改广告状态
     * @param $params
     * @return bool
     * @author ljj
     * @date 2022/2/15 10:38 上午
     */
    public function status($params)
    {
        Ad::update([
            'status' => $params['status'],
        ],['id'=>$params['id']]);

        return true;
    }
}
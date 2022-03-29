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

namespace app\adminapi\logic\decorate;


use app\common\logic\BaseLogic;
use app\common\model\decorate\Navigation;

class NavigationLogic extends BaseLogic
{
    /**
     * @notes 查看底部导航详情
     * @param $id
     * @return array
     * @author ljj
     * @date 2022/2/14 10:29 上午
     */
    public function detail($id)
    {
        return Navigation::where('id',$id)->findOrEmpty()->toArray();
    }

    /**
     * @notes 编辑底部导航
     * @param $params
     * @return bool
     * @author ljj
     * @date 2022/2/14 10:40 上午
     */
    public function edit($params)
    {
        Navigation::update([
            'name' => $params['name'],
            'selected_icon' => $params['selected_icon'],
            'un_selected_icon' => $params['un_selected_icon'],
            'selected_color' => $params['selected_color'],
            'un_selected_color' => $params['un_selected_color'],
        ],['id'=>$params['id']]);

        return true;
    }
}
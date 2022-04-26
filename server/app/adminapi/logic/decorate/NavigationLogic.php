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
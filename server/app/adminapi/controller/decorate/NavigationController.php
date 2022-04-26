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

namespace app\adminapi\controller\decorate;


use app\adminapi\controller\BaseAdminController;
use app\adminapi\lists\decorate\NavigationLists;
use app\adminapi\logic\decorate\NavigationLogic;
use app\adminapi\validate\decorate\NavigationValidate;

/**
 * 底部导航
 * Class NavigationController
 * @package app\adminapi\controller\decorate
 */
class NavigationController extends BaseAdminController
{
    /**
     * @notes 查看底部导航列表
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/14 10:14 上午
     */
    public function lists()
    {
        return $this->dataLists(new NavigationLists());
    }

    /**
     * @notes 查看底部导航详情
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/14 10:29 上午
     */
    public function detail()
    {
        $params = (new NavigationValidate())->get()->goCheck('detail');
        $result = (new NavigationLogic())->detail($params['id']);
        return $this->success('获取成功', $result);
    }

    /**
     * @notes 编辑底部导航
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/14 10:38 上午
     */
    public function edit()
    {
        $params = (new NavigationValidate())->post()->goCheck('edit');
        (new NavigationLogic())->edit($params);
        return $this->success('操作成功', [], 1, 1);
    }
}
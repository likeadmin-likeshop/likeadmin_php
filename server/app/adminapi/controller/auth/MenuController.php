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

namespace app\adminapi\controller\auth;


use app\adminapi\controller\BaseAdminController;
use app\adminapi\lists\auth\MenuLists;
use app\adminapi\logic\auth\MenuLogic;
use app\adminapi\validate\auth\MenuValidate;


/**
 * 系统菜单权限
 * Class MenuController
 * @package app\adminapi\controller\setting\system
 */
class MenuController extends BaseAdminController
{


    /**
     * @notes 获取菜单路由
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/6/29 17:41
     */
    public function route()
    {
        $result = MenuLogic::getMenuByAdminId($this->adminId);
        return $this->data($result);
    }


    /**
     * @notes 获取菜单列表
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/6/29 17:23
     */
    public function lists()
    {
        return $this->dataLists(new MenuLists());
    }


    /**
     * @notes 菜单详情
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/6/30 10:07
     */
    public function detail()
    {
        $params = (new MenuValidate())->goCheck('detail');
        return $this->data(MenuLogic::detail($params));
    }


    /**
     * @notes 添加菜单
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/6/30 10:07
     */
    public function add()
    {
        $params = (new MenuValidate())->post()->goCheck('add');
        MenuLogic::add($params);
        return $this->success('操作成功', [], 1, 1);
    }


    /**
     * @notes 编辑菜单
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/6/30 10:07
     */
    public function edit()
    {
        $params = (new MenuValidate())->post()->goCheck('edit');
        MenuLogic::edit($params);
        return $this->success('操作成功', [], 1, 1);
    }


    /**
     * @notes 删除菜单
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/6/30 10:07
     */
    public function delete()
    {
        $params = (new MenuValidate())->post()->goCheck('delete');
        MenuLogic::delete($params);
        return $this->success('操作成功', [], 1, 1);
    }


    /**
     * @notes 更新状态
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/7/6 17:04
     */
    public function updateStatus()
    {
        $params = (new MenuValidate())->post()->goCheck('status');
        MenuLogic::updateStatus($params);
        return $this->success('操作成功', [], 1, 1);
    }


}
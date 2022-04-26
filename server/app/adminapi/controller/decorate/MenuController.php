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
use app\adminapi\lists\decorate\MenuLists;
use app\adminapi\logic\decorate\MenuLogic;
use app\adminapi\validate\decorate\MenuValidate;


/**
 * 首页菜单
 * Class MenuController
 * @package app\adminapi\controller\decorate
 */
class MenuController extends BaseAdminController
{
    /**
     * @notes 查看菜单列表
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/14 2:36 下午
     */
    public function lists()
    {
        return $this->dataLists(new MenuLists());
    }

    /**
     * @notes 添加菜单
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/14 3:05 下午
     */
    public function add()
    {
        $params = (new MenuValidate())->post()->goCheck('add');
        (new MenuLogic())->add($params);
        return $this->success('操作成功', [], 1, 1);
    }

    /**
     * @notes 菜单详情
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/14 3:28 下午
     */
    public function detail()
    {
        $params = (new MenuValidate())->get()->goCheck('detail');
        $result = (new MenuLogic())->detail($params['id']);
        return $this->success('获取成功', $result);
    }

    /**
     * @notes 编辑菜单
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/14 3:39 下午
     */
    public function edit()
    {
        $params = (new MenuValidate())->post()->goCheck('edit');
        (new MenuLogic())->edit($params);
        return $this->success('操作成功', [], 1, 1);
    }

    /**
     * @notes 修改菜单状态
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/14 3:41 下午
     */
    public function status()
    {
        $params = (new MenuValidate())->post()->goCheck('status');
        (new MenuLogic())->status($params);
        return $this->success('操作成功', [], 1, 1);
    }

    /**
     * @notes 删除菜单
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/14 3:58 下午
     */
    public function del()
    {
        $params = (new MenuValidate())->post()->goCheck('del');
        (new MenuLogic())->del($params['id']);
        return $this->success('操作成功', [], 1, 1);
    }

    /**
     * @notes 商城页面
     * @return \think\response\Json
     * @author ljj
     * @date 2022/2/16 10:18 上午
     */
    public function shopPage()
    {
        $result = (new MenuLogic())->shopPage();
        return $this->success('获取成功', $result);
    }

    /**
     * @notes 商品分类页面(一级)
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author ljj
     * @date 2022/2/16 10:22 上午
     */
    public function goodsCategoryPage()
    {
        $result = (new MenuLogic())->goodsCategoryPage();
        return $this->success('获取成功', $result);
    }
}
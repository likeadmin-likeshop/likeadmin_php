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
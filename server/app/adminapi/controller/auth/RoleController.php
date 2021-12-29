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

use app\adminapi\{
    logic\auth\RoleLogic,
    lists\auth\RoleLists,
    validate\auth\RoleValidate,
    controller\BaseAdminController
};

/**
 * 角色控制器
 * Class RoleController
 * @package app\adminapi\controller\auth
 */
class RoleController extends BaseAdminController
{

    /**
     * @notes 查看角色列表
     * @return \think\response\Json
     * @author 段誉
     * @date 2021/12/29 11:49
     */
    public function lists()
    {
        return $this->dataLists(new RoleLists());
    }


    /**
     * @notes 添加权限
     * @return \think\response\Json
     * @author 段誉
     * @date 2021/12/29 11:49
     */
    public function add()
    {
        $params = (new RoleValidate())->post()->goCheck('add');
        $res = RoleLogic::add($params);
        if (true === $res) {
            return $this->success('添加成功', [], 1, 1);
        }
        return $this->fail(RoleLogic::getError());
    }


    /**
     * @notes 编辑角色
     * @return \think\response\Json
     * @author 段誉
     * @date 2021/12/29 14:18
     */
    public function edit()
    {
        $params = (new RoleValidate())->post()->goCheck('edit');
        $res = RoleLogic::edit($params);
        if (true === $res) {
            return $this->success('编辑成功', [], 1, 1);
        }
        return $this->fail(RoleLogic::getError());
    }


    /**
     * @notes 删除角色
     * @return \think\response\Json
     * @author 段誉
     * @date 2021/12/29 14:18
     */
    public function delete()
    {
        $params = (new RoleValidate())->post()->goCheck('del');
        (new RoleLogic)->delete($params['id']);
        return $this->success('删除成功');
    }


    /**
     * @notes 查看角色详情
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2021/12/29 14:18
     */
    public function detail()
    {
        $params = (new RoleValidate())->goCheck('detail');
        $detail = (new RoleLogic)->detail($params['id']);
        return $this->data($detail);
    }


}
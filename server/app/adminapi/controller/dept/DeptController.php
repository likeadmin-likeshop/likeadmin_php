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

namespace app\adminapi\controller\dept;

use app\adminapi\controller\BaseAdminController;
use app\adminapi\logic\dept\DeptLogic;
use app\adminapi\validate\dept\DeptValidate;

/**
 * 部门管理控制器
 * Class DeptController
 * @package app\adminapi\controller\dept
 */
class DeptController extends BaseAdminController
{

    /**
     * @notes 部门列表
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/5/25 18:07
     */
    public function lists()
    {
        $params = $this->request->get();
        $result = DeptLogic::lists($params);
        return $this->success('',$result);
    }


    /**
     * @notes 上级部门
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/5/26 18:36
     */
    public function leaderDept()
    {
        $result = DeptLogic::leaderDept();
        return $this->success('',$result);
    }


    /**
     * @notes 添加部门
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/5/25 18:40
     */
    public function add()
    {
        $params = (new DeptValidate())->post()->goCheck('add');
        DeptLogic::add($params);
        return $this->success('添加成功', [], 1, 1);
    }


    /**
     * @notes 编辑部门
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/5/25 18:41
     */
    public function edit()
    {
        $params = (new DeptValidate())->post()->goCheck('edit');
        $result = DeptLogic::edit($params);
        if (true === $result) {
            return $this->success('编辑成功', [], 1, 1);
        }
        return $this->fail(DeptLogic::getError());
    }


    /**
     * @notes 删除部门
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/5/25 18:41
     */
    public function delete()
    {
        $params = (new DeptValidate())->post()->goCheck('delete');
        DeptLogic::delete($params);
        return $this->success('删除成功', [], 1, 1);
    }


    /**
     * @notes 获取部门详情
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/5/25 18:41
     */
    public function detail()
    {
        $params = (new DeptValidate())->goCheck('detail');
        $result = DeptLogic::detail($params);
        return $this->data($result);
    }


    /**
     * @notes 获取部门数据
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/10/13 10:28
     */
    public function all()
    {
        $result = DeptLogic::getAllData();
        return $this->data($result);
    }


}
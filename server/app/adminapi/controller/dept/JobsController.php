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
use app\adminapi\lists\dept\JobsLists;
use app\adminapi\logic\dept\JobsLogic;
use app\adminapi\validate\dept\JobsValidate;


/**
 * 岗位管理控制器
 * Class JobsController
 * @package app\adminapi\controller\dept
 */
class JobsController extends BaseAdminController
{

    /**
     * @notes 岗位列表
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/5/26 10:00
     */
    public function lists()
    {
        return $this->dataLists(new JobsLists());
    }


    /**
     * @notes 添加岗位
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/5/25 18:40
     */
    public function add()
    {
        $params = (new JobsValidate())->post()->goCheck('add');
        JobsLogic::add($params);
        return $this->success('添加成功', [], 1, 1);
    }


    /**
     * @notes 编辑岗位
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/5/25 18:41
     */
    public function edit()
    {
        $params = (new JobsValidate())->post()->goCheck('edit');
        $result = JobsLogic::edit($params);
        if (true === $result) {
            return $this->success('编辑成功', [], 1, 1);
        }
        return $this->fail(JobsLogic::getError());
    }


    /**
     * @notes 删除岗位
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/5/25 18:41
     */
    public function delete()
    {
        $params = (new JobsValidate())->post()->goCheck('delete');
        JobsLogic::delete($params);
        return $this->success('删除成功', [], 1, 1);
    }


    /**
     * @notes 获取岗位详情
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/5/25 18:41
     */
    public function detail()
    {
        $params = (new JobsValidate())->goCheck('detail');
        $result = JobsLogic::detail($params);
        return $this->data($result);
    }


    /**
     * @notes 获取岗位数据
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/10/13 10:31
     */
    public function all()
    {
        $result = JobsLogic::getAllData();
        return $this->data($result);
    }


}
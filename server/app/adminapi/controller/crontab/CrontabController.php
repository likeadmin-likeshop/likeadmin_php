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

namespace app\adminapi\controller\crontab;

use app\adminapi\controller\BaseAdminController;
use app\adminapi\lists\crontab\CrontabLists;
use app\adminapi\logic\crontab\CrontabLogic;
use app\adminapi\validate\crontab\CrontabValidate;

/**
 * 定时任务控制器
 * Class CrontabController
 * @package app\adminapi\controller\crontab
 */
class CrontabController extends BaseAdminController
{
    /**
     * @notes 定时任务列表
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 14:27
     */
    public function lists()
    {
        return $this->dataLists(new CrontabLists());
    }


    /**
     * @notes 添加定时任务
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 14:27
     */
    public function add()
    {
        $params = (new CrontabValidate())->post()->goCheck('add');
        $result = CrontabLogic::add($params);
        if($result) {
            return $this->success('添加成功', [], 1, 1);
        }
        return $this->fail(CrontabLogic::getError());
    }


    /**
     * @notes 查看定时任务详情
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 14:27
     */
    public function detail()
    {
        $params = (new CrontabValidate())->goCheck('detail');
        $result = CrontabLogic::detail($params);
        return $this->data($result);
    }


    /**
     * @notes 编辑定时任务
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 14:27
     */
    public function edit()
    {
        $params = (new CrontabValidate())->post()->goCheck('edit');
        $result = CrontabLogic::edit($params);
        if($result) {
            return $this->success('编辑成功', [], 1, 1);
        }
        return $this->fail(CrontabLogic::getError());
    }


    /**
     * @notes 删除定时任务
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 14:27
     */
    public function delete()
    {
        $params = (new CrontabValidate())->post()->goCheck('delete');
        $result = CrontabLogic::delete($params);
        if($result) {
            return $this->success('删除成功', [], 1, 1);
        }
        return $this->fail('删除失败');
    }


    /**
     * @notes 操作定时任务
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 14:28
     */
    public function operate()
    {
        $params = (new CrontabValidate())->post()->goCheck('operate');
        $result = CrontabLogic::operate($params);
        if($result) {
            return $this->success('操作成功', [], 1, 1);
        }
        return $this->fail(CrontabLogic::getError());
    }


    /**
     * @notes 获取规则执行时间
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 14:28
     */
    public function expression()
    {
        $params = (new CrontabValidate())->goCheck('expression');
        $result = CrontabLogic::expression($params);
        return $this->data($result);
    }
}
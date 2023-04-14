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

namespace app\adminapi\controller\channel;

use app\adminapi\controller\BaseAdminController;
use app\adminapi\lists\channel\OfficialAccountReplyLists;
use app\adminapi\logic\channel\OfficialAccountReplyLogic;
use app\adminapi\validate\channel\OfficialAccountReplyValidate;

/**
 * 微信公众号回复控制器
 * Class OfficialAccountReplyController
 * @package app\adminapi\controller\channel
 */
class OfficialAccountReplyController extends BaseAdminController
{

    public array $notNeedLogin = ['index'];


    /**
     * @notes 查看回复列表(关注/关键词/默认)
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 10:58
     */
    public function lists()
    {
        return $this->dataLists(new OfficialAccountReplyLists());
    }


    /**
     * @notes 添加回复(关注/关键词/默认)
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 10:58
     */
    public function add()
    {
        $params = (new OfficialAccountReplyValidate())->post()->goCheck('add');
        $result = OfficialAccountReplyLogic::add($params);
        if ($result) {
            return $this->success('操作成功', [], 1, 1);
        }
        return $this->fail(OfficialAccountReplyLogic::getError());
    }


    /**
     * @notes 查看回复详情
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 10:58
     */
    public function detail()
    {
        $params = (new OfficialAccountReplyValidate())->goCheck('detail');
        $result = OfficialAccountReplyLogic::detail($params);
        return $this->data($result);
    }


    /**
     * @notes 编辑回复(关注/关键词/默认)
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 10:58
     */
    public function edit()
    {
        $params = (new OfficialAccountReplyValidate())->post()->goCheck('edit');
        $result = OfficialAccountReplyLogic::edit($params);
        if ($result) {
            return $this->success('操作成功', [], 1, 1);
        }
        return $this->fail(OfficialAccountReplyLogic::getError());
    }


    /**
     * @notes 删除回复(关注/关键词/默认)
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 10:59
     */
    public function delete()
    {
        $params = (new OfficialAccountReplyValidate())->post()->goCheck('delete');
        OfficialAccountReplyLogic::delete($params);
        return $this->success('操作成功', [], 1, 1);
    }


    /**
     * @notes 更新排序
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 10:59
     */
    public function sort()
    {
        $params = (new OfficialAccountReplyValidate())->post()->goCheck('sort');
        OfficialAccountReplyLogic::sort($params);
        return $this->success('操作成功', [], 1, 1);
    }


    /**
     * @notes 更新状态
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/3/29 10:59
     */
    public function status()
    {
        $params = (new OfficialAccountReplyValidate())->post()->goCheck('status');
        OfficialAccountReplyLogic::status($params);
        return $this->success('操作成功', [], 1, 1);
    }


    /**
     * @notes 微信公众号回调
     * @throws \ReflectionException
     * @author 段誉
     * @date 2022/3/29 10:59
     */
    public function index()
    {
        $result = OfficialAccountReplyLogic::index();
        return response($result->getBody())->header([
            'Content-Type' => 'text/plain;charset=utf-8'
        ]);
    }
}
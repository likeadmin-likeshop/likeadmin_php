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

namespace app\adminapi\controller\channel;

use app\adminapi\controller\BaseAdminController;
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
        return $this->dataLists();
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
        OfficialAccountReplyLogic::index();
    }
}
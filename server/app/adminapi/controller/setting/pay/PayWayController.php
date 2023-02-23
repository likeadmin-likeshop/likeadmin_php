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

namespace app\adminapi\controller\setting\pay;

use app\adminapi\controller\BaseAdminController;
use app\adminapi\logic\setting\pay\PayWayLogic;


/**
 * 支付方式
 * Class PayWayController
 * @package app\adminapi\controller\setting\pay
 */
class PayWayController extends BaseAdminController
{

    /**
     * @notes 获取支付方式
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/2/23 16:27
     */
    public function getPayWay()
    {
        $result = PayWayLogic::getPayWay();
        return $this->success('获取成功',$result);
    }


    /**
     * @notes 设置支付方式
     * @return \think\response\Json
     * @throws \Exception
     * @author 段誉
     * @date 2023/2/23 16:27
     */
    public function setPayWay()
    {
        $params = $this->request->post();
        $result = (new PayWayLogic())->setPayWay($params);
        if (true !== $result) {
            return $this->fail($result);
        }
        return $this->success('操作成功',[],1, 1);
    }
}
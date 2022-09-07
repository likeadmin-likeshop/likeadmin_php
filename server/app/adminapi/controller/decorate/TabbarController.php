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
use app\adminapi\logic\decorate\DecorateTabbarLogic;

/**
 * 装修-底部导航
 * Class DecorateTabbarController
 * @package app\adminapi\controller\decorate
 */
class TabbarController extends BaseAdminController
{

    /**
     * @notes 底部导航详情
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/7 16:39
     */
    public function detail()
    {
        $data = DecorateTabbarLogic::detail();
        return $this->success('', $data);
    }


    /**
     * @notes 底部导航保存
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/9/6 9:58
     */
    public function save()
    {
        $params = $this->request->post();
        DecorateTabbarLogic::save($params);
        return $this->success('操作成功', [], 1, 1);
    }


}
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
use app\adminapi\logic\decorate\DecorateConfigLogic;

/**
 * 装修配置
 * Class DecorateConfigController
 * @package app\adminapi\controller\theme
 */
class DecorateConfigController extends BaseAdminController
{

    /**
     * @notes 获取装修配置
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/6 9:57
     */
    public function getContent()
    {
        $type = $this->request->get('type', 1);
        $data = DecorateConfigLogic::getContent($type);
        return $this->success('', $data);
    }


    /**
     * @notes 设置装修配置
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/9/6 9:58
     */
    public function setContent()
    {
        $params = $this->request->post();
        DecorateConfigLogic::setContent($params);
        return $this->success('操作成功', [], 1, 1);
    }


}
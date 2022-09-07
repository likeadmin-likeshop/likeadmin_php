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
use app\adminapi\logic\decorate\DecoratePageLogic;


/**
 * 装修页面
 * Class DecoratePageController
 * @package app\adminapi\controller\decorate
 */
class PageController extends BaseAdminController
{


    /**
     * @notes 获取页面链接信息
     * @return \think\response\Json
     * @author 段誉
     * @date 2022/9/6 14:30
     */
    public function getPageLink()
    {
        $type = $this->request->get('type', 'shop');
        $page = DecoratePageLogic::getPageLink($type);
        return $this->success('操作成功', $page);
    }


}
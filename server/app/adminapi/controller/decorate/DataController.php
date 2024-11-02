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
use app\adminapi\logic\decorate\DecorateDataLogic;
use think\response\Json;

/**
 * 装修-数据
 * Class DataController
 * @package app\adminapi\controller\decorate
 */
class DataController extends BaseAdminController
{
    /**
     * @notes 文章列表
     * @return Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author mjf
     * @date 2024/3/14 18:13
     */
    public function article(): Json
    {
        $limit = $this->request->get('limit/d', 10);
        $result = DecorateDataLogic::getArticleLists($limit);
        return $this->success('获取成功', $result);
    }

    /**
     * @notes pc设置
     * @return Json
     * @author mjf
     * @date 2024/3/14 18:13
     */
    public function pc(): Json
    {
        $result = DecorateDataLogic::pc();
        return $this->data($result);
    }

}
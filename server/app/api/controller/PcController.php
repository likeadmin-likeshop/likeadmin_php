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

namespace app\api\controller;


use app\api\logic\PcLogic;
use think\response\Json;


/**
 * PC
 * Class PcController
 * @package app\api\controller
 */
class PcController extends BaseApiController
{

    public array $notNeedLogin = ['index', 'config', 'infoCenter', 'articleDetail'];


    /**
     * @notes 首页数据
     * @return Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/21 19:15
     */
    public function index()
    {
        $result = PcLogic::getIndexData();
        return $this->data($result);
    }


    /**
     * @notes 全局配置
     * @return Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/21 19:41
     */
    public function config()
    {
        $result = PcLogic::getConfigData();
        return $this->data($result);
    }


    /**
     * @notes 资讯中心
     * @return Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/10/19 16:55
     */
    public function infoCenter()
    {
        $result = PcLogic::getInfoCenter();
        return $this->data($result);
    }


    /**
     * @notes 获取文章详情
     * @return Json
     * @author 段誉
     * @date 2022/10/20 15:18
     */
    public function articleDetail()
    {
        $id = $this->request->get('id/d', 0);
        $source = $this->request->get('source/s', 'default');
        $result = PcLogic::getArticleDetail($this->userId, $id, $source);
        return $this->data($result);
    }

}
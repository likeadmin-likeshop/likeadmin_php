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


namespace app\adminapi\lists;


use app\common\lists\BaseDataLists;

/**
 * 管理员模块数据列表基类
 * Class BaseAdminDataLists
 * @package app\adminapi\lists
 */
abstract class BaseAdminDataLists extends BaseDataLists
{
    protected array $adminInfo;
    protected int $adminId;

    public function __construct()
    {
        parent::__construct();
        $this->adminInfo = $this->request->adminInfo;
        $this->adminId = $this->request->adminId;
    }


}
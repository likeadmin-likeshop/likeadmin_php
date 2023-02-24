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

namespace app\adminapi\controller\finance;

use app\adminapi\controller\BaseAdminController;
use app\adminapi\lists\finance\AccountLogLists;
use app\common\enum\user\AccountLogEnum;

/***
 * 账户流水控制器
 * Class AccountLogController
 * @package app\adminapi\controller
 */
class AccountLogController extends BaseAdminController
{


    /**
     * @notes 账户流水明细
     * @return \think\response\Json
     * @author 段誉
     * @date 2023/2/24 15:25
     */
    public function lists()
    {
        return $this->dataLists(new AccountLogLists());
    }


    /**
     * @notes 用户余额变动类型
     * @return \think\response\Json
     * @author 段誉
     * @date 2023/2/24 15:25
     */
    public function getUmChangeType()
    {
        return $this->data(AccountLogEnum::getUserMoneyChangeTypeDesc());
    }


}
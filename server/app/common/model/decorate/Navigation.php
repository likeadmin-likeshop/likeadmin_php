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

namespace app\common\model\decorate;


use app\common\model\BaseModel;
use app\common\service\FileService;

class Navigation extends BaseModel
{
    protected $name = 'dev_navigation';


    /**
     * @notes 选中图标
     * @param $value
     * @param $data
     * @return string
     * @author ljj
     * @date 2022/2/23 10:26 上午
     */
    public function getSelectedIconAttr($value,$data)
    {
        return $value ? FileService::getFileUrl($value) : '';
    }

    /**
     * @notes 未选中图标
     * @param $value
     * @param $data
     * @return string
     * @author ljj
     * @date 2022/2/23 10:26 上午
     */
    public function getUnSelectedIconAttr($value,$data)
    {
        return $value ? FileService::getFileUrl($value) : '';
    }
}
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

namespace app\adminapi\validate\decorate;

use app\common\model\decorate\Navigation;
use app\common\validate\BaseValidate;

/**
 * 底部导航验证
 * Class NavigationValidate
 * @package app\adminapi\validate\decorate
 */
class NavigationValidate extends BaseValidate
{
    protected $rule = [
        'id' => 'require|checkId',
        'name' => 'require|checkName',
        'selected_icon' => 'require',
        'un_selected_icon' => 'require',
        'selected_color' => 'require',
        'un_selected_color' => 'require',
    ];

    protected $message = [
        'id.require' => '参数错误',
        'name.require' => '请输入导航名称',
        'selected_icon.require' => '请选择选中图标',
        'un_selected_icon.require' => '请选择未选中图标',
        'selected_color.require' => '请选择选中字体颜色',
        'un_selected_color.require' => '请选择默认字体颜色',
    ];

    public function sceneDetail()
    {
        return $this->only(['id']);
    }

    public function sceneEdit()
    {
        return $this->only(['id','name','selected_icon','un_selected_icon','selected_color','un_selected_color']);
    }


    /**
     * @notes 检验导航id
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author ljj
     * @date 2022/2/14 10:28 上午
     */
    public function checkId($value,$rule,$data)
    {
        $result = Navigation::where('id',$value)->findOrEmpty();
        if ($result->isEmpty()) {
            return '导航不存在';
        }
        return true;
    }

    /**
     * @notes 检验导航名称
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author ljj
     * @date 2022/2/14 10:37 上午
     */
    public function checkName($value,$rule,$data)
    {
        $where[] = ['name','=',$value];
        if (isset($data['id'])) {
            $where[] = ['id','<>',$data['id']];
        }
        $result = Navigation::where($where)->findOrEmpty();
        if (!$result->isEmpty()) {
            return '导航名称已存在，请重新输入';
        }
        return true;
    }
}

<?php
// +----------------------------------------------------------------------
// | likeshop开源商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop系列产品在gitee、github等公开渠道开源版本可免费商用，未经许可不能去除前后端官方版权标识
// |  likeshop系列产品收费版本务必购买商业授权，购买去版权授权后，方可去除前后端官方版权标识
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | likeshop团队版权所有并拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshop.cn.team
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

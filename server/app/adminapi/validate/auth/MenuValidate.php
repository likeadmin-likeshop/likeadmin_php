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

namespace app\adminapi\validate\auth;


use app\common\validate\BaseValidate;
use app\common\model\auth\{SystemRole,SystemMenu};


/**
 * 系统菜单
 * Class SystemMenuValidate
 * @package app\adminapi\validate\auth
 */
class MenuValidate extends BaseValidate
{

    protected $rule = [
        'id' => 'require',
        'pid' => 'require|checkPid',
        'type' => 'require|in:M,C,A',
        'name' => 'require|length:1,30|checkUniqueName',
        'icon' => 'max:100',
        'sort' => 'require|egt:0',
        'perms' => 'max:100',
        'paths' => 'max:200',
        'component' => 'max:200',
        'selected' => 'max:200',
        'params' => 'max:200',
        'is_cache' => 'require|in:0,1',
        'is_show' => 'require|in:0,1',
        'is_disable' => 'require|in:0,1',
    ];


    protected $message = [
        'id.require' => '参数缺失',
        'pid.require' => '请选择上级菜单',
        'type.require' => '请选择菜单类型',
        'type.in' => '菜单类型参数值错误',
        'name.require' => '请填写菜单名称',
        'name.length' => '菜单名称长度需为1~30个字符',
        'icon.max' => '图标名称不能超过100个字符',
        'sort.require' => '请填写排序',
        'sort.egt' => '排序值需大于或等于0',
        'perms.max' => '权限字符不能超过100个字符',
        'paths.max' => '路由地址不能超过200个字符',
        'component.max' => '组件路径不能超过200个字符',
        'selected.max' => '选中菜单路径不能超过200个字符',
        'params.max' => '路由参数不能超过200个字符',
        'is_cache.require' => '请选择缓存状态',
        'is_cache.in' => '缓存状态参数值错误',
        'is_show.require' => '请选择显示状态',
        'is_show.in' => '显示状态参数值错误',
        'is_disable.require' => '请选择菜单状态',
        'is_disable.in' => '菜单状态参数值错误',
    ];


    /**
     * @notes 添加场景
     * @return MenuValidate
     * @author 段誉
     * @date 2022/6/29 18:26
     */
    public function sceneAdd()
    {
        return $this->remove('id', true);
    }


    /**
     * @notes 详情场景
     * @return MenuValidate
     * @author 段誉
     * @date 2022/6/29 18:27
     */
    public function sceneDetail()
    {
        return $this->only(['id']);
    }


    /**
     * @notes 删除场景
     * @return MenuValidate
     * @author 段誉
     * @date 2022/6/29 18:27
     */
    public function sceneDelete()
    {
        return $this->only(['id'])
            ->append('id', 'checkAbleDelete');
    }


    /**
     * @notes 更新状态场景
     * @return MenuValidate
     * @author 段誉
     * @date 2022/7/6 17:04
     */
    public function sceneStatus()
    {
        return $this->only(['id', 'is_disable']);
    }


    /**
     * @notes 校验菜单名称是否已存在
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2022/6/29 18:24
     */
    protected function checkUniqueName($value, $rule, $data)
    {
        if ($data['type'] != 'M') {
            return true;
        }
        $where[] = ['type', '=', $data['type']];
        $where[] = ['name', '=', $data['name']];

        if (!empty($data['id'])) {
            $where[] = ['id', '<>', $data['id']];
        }

        $check = SystemMenu::where($where)->findOrEmpty();

        if (!$check->isEmpty()) {
            return '菜单名称已存在';
        }

        return true;
    }


    /**
     * @notes 是否有子级菜单
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2022/6/30 9:40
     */
    protected function checkAbleDelete($value, $rule, $data)
    {
        $hasChild = SystemMenu::where(['pid' => $value])->findOrEmpty();
        if (!$hasChild->isEmpty()) {
            return '存在子菜单,不允许删除';
        }

        // 已绑定角色菜单不可以删除
        $isBindRole = SystemRole::hasWhere('roleMenuIndex', ['menu_id' => $value])->findOrEmpty();
        if (!$isBindRole->isEmpty()) {
            return '已分配菜单不可删除';
        }

        return true;
    }


    /**
     * @notes 校验上级
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2022/6/30 9:51
     */
    protected function checkPid($value, $rule, $data)
    {
        if (!empty($data['id']) && $data['id'] == $value) {
            return '上级菜单不能选择自己';
        }
        return true;
    }

}
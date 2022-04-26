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

use app\adminapi\logic\auth\AuthLogic;
use app\common\{
    model\auth\Role,
    model\auth\Admin,
    validate\BaseValidate
};

/**
 * 角色验证器
 * Class RoleValidate
 * @package app\adminapi\validate\auth
 */
class RoleValidate extends BaseValidate
{
    protected $rule = [
        'id' => 'require|checkRole',
        'name' => 'require|max:64|unique:' . Role::class . ',name',
        'auth_keys' => 'array|checkAuth',
    ];

    protected $message = [
        'id.require' => '请选择角色',
        'name.require' => '请输入角色名称',
        'name.max' => '角色名称最长为16个字符',
        'name.unique' => '角色名称已存在',
        'auth_keys.array' => '权限格式错误'
    ];

    /**
     * @notes 添加场景
     * @return RoleValidate
     * @author 段誉
     * @date 2021/12/29 15:47
     */
    public function sceneAdd()
    {
        return $this->only(['name', 'auth_keys']);
    }

    /**
     * @notes 详情场景
     * @return RoleValidate
     * @author 段誉
     * @date 2021/12/29 15:47
     */
    public function sceneDetail()
    {
        return $this->only(['id']);
    }

    /**
     * @notes 删除场景
     * @return RoleValidate
     * @author 段誉
     * @date 2021/12/29 15:48
     */
    public function sceneDel()
    {
        return $this->only(['id'])
            ->append('id', 'checkAdmin');
    }


    /**
     * @notes 验证角色是否存在
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2021/12/29 15:48
     */
    public function checkRole($value, $rule, $data)
    {
        if (!Role::find($value)) {
            return '角色不存在';
        }
        return true;
    }



    /**
     * @notes 验证角色是否被使用
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2021/12/29 15:49
     */
    public function checkAdmin($value, $rule, $data)
    {
        if (Admin::where(['role_id' => $value])->find()) {
            return '有管理员在使用该角色，不允许删除';
        }
        return true;
    }



    /**
     * @notes 验证权限数据是否完整
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2021/12/29 15:50
     */
    public function checkAuth($value, $rule, $data)
    {
        $configAuth = AuthLogic::getAuth();

        foreach ($value as $postAuth) {
            $keyList = explode('/', $postAuth);
            if (empty($keyList)) {
                return '权限数据错误';
            }
            $keys = explode('.', $keyList[1] ?? '');
            if (count($keys) < 2) {
                return '权限数据错误';
            }
            $auth = $configAuth[$keyList[0]][$keys[0]][$keys[1]] ?? [];
            if (empty($auth)) {
                return '权限数据错误';
            }
        }
        return true;

    }
}
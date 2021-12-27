<?php
// +----------------------------------------------------------------------
// | likeshop100%开源免费商用商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | 商业版本务必购买商业授权，以免引起法律纠纷
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshopTeam
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

    public function sceneAdd()
    {
        return $this->only(['name', 'auth_keys']);
    }

    public function sceneDetail()
    {
        return $this->only(['id']);
    }

    public function sceneDel()
    {
        return $this->only(['id'])
            ->append('id', 'checkAdmin');
    }

    //验证角色是否存在
    public function checkRole($value, $rule, $data)
    {
        if (!Role::find($value)) {
            return '角色不存在';
        }
        return true;
    }

    //验证角色是否被使用
    public function checkAdmin($value, $rule, $data)
    {
        if (Admin::where(['role_id' => $value])->find()) {
            return '有管理员在使用该角色，不允许删除';
        }

        return true;
    }

    //验证权限数据是否完整
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
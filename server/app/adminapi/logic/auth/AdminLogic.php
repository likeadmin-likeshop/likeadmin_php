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

namespace app\adminapi\logic\auth;

use app\common\cache\AdminAuthCache;
use app\common\enum\YesNoEnum;
use app\common\logic\BaseLogic;
use app\common\model\auth\Admin;
use app\common\model\auth\AdminSession;
use app\common\cache\AdminTokenCache;
use app\common\service\FileService;
use think\facade\Config;
use think\facade\Db;

/**
 * 管理员逻辑
 * Class AdminLogic
 * @package app\adminapi\logic\auth
 */
class AdminLogic extends BaseLogic
{
    /**
     * @notes 添加管理员
     * @param $params
     * @author Tab
     * @date 2021/7/13 11:44
     */
    public static function add($params)
    {
        $time = time();
        $passwordSalt = Config::get('project.unique_identification');
        $password = create_password($params['password'], $passwordSalt);
        $avatar = isset($params['avatar']) && !empty($params['avatar']) ? FileService::setFileUrl($params['avatar']) : config('project.default_image.admin_avatar');
        $data = [
            'name' => $params['name'],
            'account' => $params['account'],
            'avatar' => $avatar,
            'password' => $password,
            'role_id' => $params['role_id'],
            'create_time' => $time,
            'disable' => $params['disable'],
            'multipoint_login' => $params['multipoint_login'],
        ];

        Admin::create($data);
    }

    /**
     * @notes 编辑管理员
     * @param $params
     * @return bool
     * @author Tab
     * @date 2021/7/13 11:47
     */
    public static function edit($params)
    {
        Db::startTrans();
        try {
            // admin账号不允许被禁用
            if ($params['account'] == 'admin' && $params['disable'] == YesNoEnum::YES) {
                throw new \Exception("超级管理员不允许被禁用");
            }
            $avatar = isset($params['avatar']) && !empty($params['avatar']) ? FileService::setFileUrl($params['avatar']) : '';
            $data = [
                'id' => $params['id'],
                'name' => $params['name'],
                'account' => $params['account'],
                'role_id' => $params['role_id'],
                'disable' => $params['disable'],
                'avatar' => $avatar,
                'multipoint_login' => $params['multipoint_login']
            ];

            if (!empty($params['password'])) {
                $passwordSalt = Config::get('project.unique_identification');
                $data['password'] = create_password($params['password'], $passwordSalt);
            }

            $role_id = Admin::where('id', $params['id'])->value('role_id');
            if ($params['disable'] == 1 || $role_id != $params['role_id']) {
                // 禁用或更换角色后，让之前登录的token都过期(无论是否支持多处登录)
                $tokenArr = AdminSession::where('admin_id', $params['id'])->select()->toArray();
                foreach ($tokenArr as $token) {
                    self::expireToken($token['token']);
                }
            }

            Admin::update($data);
            (new AdminAuthCache($params['id']))->clearAuthCache();


            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            self::setError($e->getMessage());
            return false;
        }
    }

    /**
     * @notes 删除管理员
     * @param $params
     * @return bool
     * @author Tab
     * @date 2021/7/13 11:50
     */
    public static function delete($params)
    {
        Db::startTrans();
        try {
            $admin = Admin::findOrEmpty($params['id']);
            if ($admin->root == YesNoEnum::YES) {
                throw new \Exception("超级管理员不允许被删除");
            }
            Admin::destroy($params['id']);

            // 删除后，让之前登录的token都过期(无论是否支持多处登录)
            $tokenArr = AdminSession::where('admin_id', $params['id'])->select()->toArray();
            foreach ($tokenArr as $token) {
                self::expireToken($token['token']);
            }
            (new AdminAuthCache($params['id']))->clearAuthCache();
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            self::setError($e->getMessage());
            return false;
        }
    }

    /**
     * @notes 将token变为无效
     * @param $token
     * @return false
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Tab
     * @date 2021/7/13 11:50
     */
    public static function expireToken($token)
    {
        $adminSession = AdminSession::where('token', '=', $token)
            ->with('admin')
            ->find();

        if (empty($adminSession)) {
            return false;
        }

        $time = time();
        $adminSession->expire_time = $time;
        $adminSession->update_time = $time;
        $adminSession->save();

        (new  AdminTokenCache())->deleteAdminInfo($token);
    }

    /**
     * @notes 查看管理员详情
     * @param $params
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Tab
     * @date 2021/7/13 11:52
     */
    public static function detail($params)
    {
        return Admin::field('account,name,role_id,disable,multipoint_login,avatar')->find($params['id'])->toArray();
    }
}
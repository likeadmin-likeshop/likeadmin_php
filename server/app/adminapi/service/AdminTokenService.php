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


namespace app\adminapi\service;

use app\common\cache\AdminTokenCache;
use app\common\model\auth\AdminSession;
use think\facade\Config;

/**
 * 管理员token
 * Class AdminTokenService
 * @package app\adminapi\service
 */
class AdminTokenService
{
    /**
     * @notes 设置或更新管理员token
     * @param $adminId //管理员id
     * @param $terminal //多终端名称
     * @param $multipointLogin //是否支持多处登录
     * @return false|mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 令狐冲
     * @date 2021/7/2 20:25
     */
    public static function setToken($adminId, $terminal, $multipointLogin = 1)
    {
        $time = time();
        $adminSession = AdminSession::where([['admin_id', '=', $adminId], ['terminal', '=', $terminal]])->find();

        //获取token延长过期的时间
        $expireTime = $time + Config::get('project.admin_token.expire_duration');
        $adminTokenCache = new AdminTokenCache();

        //token处理
        if ($adminSession) {
            if ($adminSession->expire_time < $time || $multipointLogin === 0) {
                //清空缓存
                $adminTokenCache->deleteAdminInfo($adminSession->token);
                //如果token过期或账号设置不支持多处登录，更新token
                $adminSession->token = create_token($adminId);
            }
            $adminSession->expire_time = $expireTime;
            $adminSession->update_time = $time;

            $adminSession->save();
        } else {
            //找不到在该终端的token记录，创建token记录
            $adminSession = AdminSession::create([
                'admin_id' => $adminId,
                'terminal' => $terminal,
                'token' => create_token($adminId),
                'expire_time' => $expireTime
            ]);
        }

        return $adminTokenCache->setAdminInfo($adminSession->token);
    }

    /**
     * @notes 延长token过期时间
     * @param $token
     * @return array|false|mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 令狐冲
     * @date 2021/7/5 14:25
     */
    public static function overtimeToken($token)
    {
        $time = time();
        $adminSession = AdminSession::where('token', '=', $token)->findOrEmpty();
        if ($adminSession->isEmpty()) {
            return false;
        }
        //延长token过期时间
        $adminSession->expire_time = $time + Config::get('project.admin_token.expire_duration');
        $adminSession->update_time = $time;
        $adminSession->save();
        return (new AdminTokenCache())->setAdminInfo($adminSession->token);
    }

    /**
     * @notes 设置token为过期
     * @param $token
     * @return bool
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 令狐冲
     * @date 2021/7/5 14:31
     */
    public static function expireToken($token)
    {
        $adminSession = AdminSession::where('token', '=', $token)
            ->with('admin')
            ->findOrEmpty();

        if ($adminSession->isEmpty()) {
            return false;
        }

        //当支持多处登录的时候，服务端不注销
        if ($adminSession->admin->multipoint_login === 1) {
            return false;
        }

        $time = time();
        $adminSession->expire_time = $time;
        $adminSession->update_time = $time;
        $adminSession->save();

        return (new AdminTokenCache())->deleteAdminInfo($token);
    }

}
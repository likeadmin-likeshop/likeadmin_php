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

namespace app\adminapi\logic;

use app\common\logic\BaseLogic;
use app\common\model\auth\Admin;
use app\adminapi\service\AdminTokenService;
use app\common\service\FileService;
use think\facade\Config;

/**
 * 登录逻辑
 * Class LoginLogic
 * @package app\adminapi\logic
 */
class LoginLogic extends BaseLogic
{
    /**
     * @notes 管理员账号登录
     * @param $params
     * @return false|mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 令狐冲
     * @date 2021/6/30 17:00
     */
    public function login($params)
    {
        $time = time();
        $admin = Admin::where('account', '=', $params['account'])->find();

        //用户表登录信息更新
        $admin->login_time = $time;
        $admin->login_ip = request()->ip();
        $admin->save();

        //设置token
        $adminInfo = AdminTokenService::setToken($admin->id, $params['terminal'], $admin->multipoint_login);

        //返回登录信息
        $avatar = $admin->avatar ? $admin->avatar : Config::get('project.default_image.admin_avatar');
        $avatar = FileService::getFileUrl($avatar);
        return [
            'name' => $adminInfo['name'],
            'avatar' => $avatar,
            'role_name' => $adminInfo['role_name'],
            'token' => $adminInfo['token'],
        ];
    }


    /**
     * @notes 退出登录
     * @param $adminInfo
     * @return bool
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 令狐冲
     * @date 2021/7/5 14:34
     */
    public function logout($adminInfo)
    {
        //token不存在，不注销
        if (!isset($adminInfo['token'])) {
            return false;
        }
        //设置token过期
        return AdminTokenService::expireToken($adminInfo['token']);
    }
}
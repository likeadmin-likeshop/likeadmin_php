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

declare (strict_types=1);

namespace app\adminapi\http\middleware;

use app\common\{
    cache\AdminAuthCache,
    service\JsonService
};

/**
 * 权限验证中间件
 * Class AuthMiddleware
 * @package app\adminapi\http\middleware
 */
class AuthMiddleware
{
    /**
     * @notes 权限验证
     * @param $request
     * @param \Closure $next
     * @return mixed
     * @author 令狐冲
     * @date 2021/7/2 19:29
     */
    public function handle($request, \Closure $next)
    {
        //不登录访问，无需权限验证
        if ($request->controllerObject->isNotNeedLogin()) {
            return $next($request);
        };

        //系统默认超级管理员，无需权限验证
        if (1 === $request->adminInfo['root'] ) {
            return $next($request);
        }
        $accessUri = strtolower($request->controller() . '/' . $request->action());//当前访问uri
        $adminAuthCache = new AdminAuthCache($request->adminInfo['admin_id']);
        $allUri = $adminAuthCache->getAllUri()['action_auth'];
        //判断该当前访问的uri是否存在，不存在无需验证
        if (!in_array($accessUri, $allUri)) {
            return $next($request);
        }
        //管理员访问的uri判断
        $AdminUris = $adminAuthCache->getAdminUri()['action_auth'] ?? [];
        if (in_array($accessUri, $AdminUris)) {
            return $next($request);
        }
        return JsonService::fail('权限不足，无法访问或操作');
    }
}
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

declare (strict_types=1);

namespace app\adminapi\http\middleware;

use app\common\cache\AdminTokenCache;
use app\adminapi\service\AdminTokenService;
use app\common\service\JsonService;
use think\facade\Config;

/**
 * 登录中间件
 * Class LoginMiddleware
 * @package app\adminapi\http\middleware
 */
class LoginMiddleware
{
    /**
     * @notes 登录验证
     * @param $request
     * @param \Closure $next
     * @return mixed|\think\response\Json
     * @author 令狐冲
     * @date 2021/7/1 17:33
     */
    public function handle($request, \Closure $next)
    {
        $token = $request->header('token');
        //判断接口是否免登录
        $isNotNeedLogin = $request->controllerObject->isNotNeedLogin();

        //不直接判断$isNotNeedLogin结果，使不需要登录的接口通过，为了兼容某些接口可以登录或不登录访问
        if (empty($token) && !$isNotNeedLogin) {
            //没有token并且该地址需要登录才能访问
            return JsonService::fail('请求参数缺token', [], 0, 0);
        }

        $adminInfo = (new AdminTokenCache())->getAdminInfo($token);
        if (empty($adminInfo) && !$isNotNeedLogin) {
            //token过期无效并且该地址需要登录才能访问
            return JsonService::fail('登录超时，请重新登录', [], -1);
        }

        //token临近过期，自动续期
        if ($adminInfo) {
            //获取临近过期自动续期时长
            $beExpireDuration = Config::get('project.admin_token.be_expire_duration');
            //token续期
            if (time() > ($adminInfo['expire_time'] - $beExpireDuration)) {
                $result = AdminTokenService::overtimeToken($token);
                //续期失败（数据表被删除导致）
                if (empty($result)) {
                    return JsonService::fail('登录过期', [], -1);
                }
            }
        }

        //给request赋值，用于控制器
        $request->adminInfo = $adminInfo;
        $request->adminId = $adminInfo['admin_id'] ?? 0;

        return $next($request);
    }

}
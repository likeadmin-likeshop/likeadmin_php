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


use app\common\service\JsonService;

/**
 * 校验演示环境
 * Class CheckDemoMiddleware
 * @package app\adminapi\http\middleware
 */
class CheckDemoMiddleware
{

    // 允许post的接口
    protected $ablePost = [
        'login/account',
        'login/logout',
    ];

    public function handle($request, \Closure $next)
    {
        if ($request->method() != 'POST') {
            return $next($request);
        }

        $accessUri = strtolower($request->controller() . '/' . $request->action());
        if (!in_array($accessUri, $this->ablePost) && env('project.demo_env')) {
            return JsonService::fail('演示环境不支持修改数据，请下载源码本地部署体验');
        }

        return $next($request);
    }

}
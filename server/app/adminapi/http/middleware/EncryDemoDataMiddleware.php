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

/**
 * 演示环境数据加密
 * Class DemoDataMiddleware
 * @package app\adminapi\http\middleware
 */
class EncryDemoDataMiddleware
{

    // 需要过滤的接口
    protected $needCheck = [
        // 存储配置
        'setting.storage/detail',
        // 短信配置
        'notice.smsConfig/detail',
        // 公众号配置
        'channel.official_account_setting/getConfig',
        // 小程序配置
        'channel.mnp_settings/getConfig',
        // 开放平台配置
        'channel.open_setting/getConfig',
    ];


    // 必须过滤字段
    protected $needCheckParams = [
        'app_id',
        'app_secret',
        'original_id',
    ];


    // 可以排除字段
    protected $excludeParams = [
        'name',
        'icon',
        'image',
        'qr_code',
    ];


    public function handle($request, \Closure $next)
    {
        $response = $next($request);

        // 非需校验的接口 或者 未开启演示模式
        $accessUri = strtolower($request->controller() . '/' . $request->action());
        if (!in_array($accessUri, lower_uri($this->needCheck)) || !env('project.demo_env')) {
            return $response;
        }

        // 非json数据
        if (!method_exists($response, 'header') || !in_array('application/json; charset=utf-8', $response->getHeader())) {
            return $response;
        }

        $data = $response->getData();
        if (!is_array($data) || empty($data)) {
            return $response;
        }

        foreach ($data['data'] as $key => $item) {
            // 排除部分字段，如图片等
            if (in_array($key, $this->excludeParams)) {
                continue;
            }

            if (in_array($key, $this->needCheckParams)) {
                $data['data'][$key] = '******';
                continue;
            }

            if (is_string($item)) {
                $data['data'][$key] = '******';
            }
        }

        return $response->data($data);
    }

}
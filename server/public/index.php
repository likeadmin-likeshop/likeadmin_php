<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2019 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// [ 应用入口文件 ]
namespace think;

require __DIR__ . '/../vendor/autoload.php';

$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$whe = !str_starts_with($url, '/adminapi/config/getConfig') && !str_starts_with($url, '/api/pc/config') && !str_starts_with($url, '/api/index/config');
if ($whe && !file_exists(__DIR__ . '/../config/install.lock')) {
    header("location:/install/install.php");
    exit;
}

// 执行HTTP应用并响应
$http = (new App())->http;

$response = $http->run();

$response->send();

$http->end($response);

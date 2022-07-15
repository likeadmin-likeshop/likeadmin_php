<?php
return [
    // 系统版本号
    'version' => '1.1.4',

    // 官网
    'website' => [
        'name' => env('project.web_name', 'likeadmin'), // 网站名称
        'url' => env('project.web_url', 'www.likeadmin.cn/'), // 网站地址
        'login_image' => 'resource/image/adminapi/default/login_image.png',
        'web_logo' => 'resource/image/adminapi/default/web_logo.png', // 网站logo
        'web_favicon' => 'resource/image/adminapi/default/web_favicon.ico', // 网站图标
    ],

    // 唯一标识，密码盐、路径加密等
    'unique_identification' => env('project.unique_identification', 'likeadmin'),

    // 后台管理员token（登录令牌）配置
    'admin_token' => [
        'expire_duration' => 3600 * 8,//管理后台token过期时长(单位秒）
        'be_expire_duration' => 3600,//管理后台token临时过期前时长，自动续期
    ],

    // 商城用户token（登录令牌）配置
    'user_token' => [
        'expire_duration' => 3600 * 8,//用户token过期时长(单位秒）
        'be_expire_duration' => 3600,//用户token临时过期前时长，自动续期
    ],

    // 列表页
    'lists' => [
        'page_size_max' => 25000,//列表页查询数量限制（列表页每页数量、导出每页数量）
        'page_size' => 25, //默认每页数量
    ],

    // 各种默认图片
    'default_image' => [
        'admin_avatar' => 'resource/image/adminapi/default/avatar.png',
    ],

    // 上唇文件限制
    'allow_upload' => [
        'jpg', 'png', 'gif', 'jpeg', 'ico', 'bmp',
        'wmv','avi','mpg','mpeg','3gp','mov','mp4',
        'flv','f4v','rmvb','mkv'
    ]



];

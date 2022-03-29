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


/**
 * 权限
 */
return [
    // 首页
    'index' => [
        //控制台
        'index' => [
            'page_path' => '/workbench',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['workbench/index'],
            ],
        ]
    ],
    // 权限管理
    'auth' => [
        //管理员
        'permissions' => [
            'page_path' => '/permission/admin',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['auth.admin/lists', 'auth.role/lists'],
            ],
            'manage' => [
                'button_auth' => ['auth_all'],
                'action_auth' => [
                    'auth.admin/add',
                    'auth.admin/edit',
                    'auth.admin/detail',
                    'auth.admin/del',
                ],
            ],
        ],
        //角色
        'role' => [
            'page_path' => '/permission/role',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['auth.role/lists'],
            ],
            'manage' => [
                'button_auth' => ['auth_all'],
                'action_auth' => [
                    'auth.role/add',
                    'auth.role/edit',
                    'auth.role/detail',
                    'auth.role/del',
                    'config/getMenu',
                ],
            ],
        ],
    ],
    // 系统设置
    'setting' => [
        // 网站信息
        'website' => [
            'page_path' => '/setting/website/information',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['setting.web.websetting/getwebsite'],
            ],
            'save' => [
                'button_auth' => ['auth_all'],
                'action_auth' => ['setting.web.websetting/setwebsite'],
            ],
        ],
        //备案信息
        'record' => [
            'page_path' => '/setting/website/filing',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['setting.web.websetting/getcopyright'],
            ],
            'save' => [
                'button_auth' => ['auth_all'],
                'action_auth' => ['setting.web.websetting/setcopyright'],
            ],
        ],
        //用户设置
        'user' => [
            'page_path' => '/setting/user/user_setting',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['settings.user.user/getconfig'],
            ],
            'save' => [
                'button_auth' => ['auth_all'],
                'action_auth' => ['settings.user.user/setconfig'],
            ],
        ],
        //登录注册
        'loginregister' => [
            'page_path' => '/setting/user/login_register',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['settings.user.user/getregisterconfig'],
            ],
            'save' => [
                'button_auth' => ['auth_all'],
                'action_auth' => ['settings.user.user/setregisterconfig'],
            ],
        ],
        //系统环境
        'environment' => [
            'page_path' => '/setting/system/environment',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['setting.system.system/info'],
            ],
        ],
        //计划任务
        'task' => [
            'page_path' => '/setting/task',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['crontab.crontab/lists'],
            ],
            'manage' => [
                'button_auth' => ['view'],
                'action_auth' => [
                    'crontab.crontab/add',
                    'crontab.crontab/edit',
                    'crontab.crontab/operate',
                    'crontab.crontab/del',
                ],
            ],
        ],
    ],

];
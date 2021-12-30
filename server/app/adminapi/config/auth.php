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
    'index'     => [
        //控制台
        'index' => [
            'page_path'     => '/workbench/index',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['workbench/index'],
            ],
        ]
    ],
    // 权限管理
    'auth'      => [
        //管理员
        'permissions'   => [
            'page_path'     => '/permissions/admin/index',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['auth.admin/lists','auth.role/lists'],
            ],
            'manage'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => [
                    'auth.admin/add',
                    'auth.admin/edit',
                    'auth.admin/detail',
                    'auth.admin/del',
                ],
            ],
        ],
        //角色
        'role'          => [
            'page_path'     => '/permissions/role/index',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['auth.role/lists'],
            ],
            'manage'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => [
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
    'setting'   => [
        // 网站信息
        'website'      => [
            'page_path'     => '/setting/website/information',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['setting.web.websetting/getwebsite'],
            ],
            'save'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['setting.web.websetting/setwebsite'],
            ],
        ],
        //备案信息
        'record'      => [
            'page_path'     => '/setting/website/filing',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['setting.web.websetting/getcopyright'],
            ],
            'save'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['setting.web.websetting/setcopyright'],
            ],
        ],
        //系统环境
        'environment'      => [
            'page_path'     => '/setting/system/environment',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['setting.system.system/info'],
            ],
        ],
    ],

];
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
    // 开发工具
    'tools' => [
        // 代码生成
        'generator' => [
            'page_path' => '/dev_tools/code',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => [
                    'tools.generator/generatetable',
                    'tools.generator/datatable',
                ],
            ],
            'manage' => [
                'button_auth' => ['auth_all'],
                'action_auth' => [
                    'tools.generator/preview',
                    'tools.generator/selecttable',
                    'tools.generator/selecttable',
                    'tools.generator/edit',
                    'tools.generator/synccolumn',
                    'tools.generator/delete',
                    'tools.generator/generate',
                ],
            ],
        ],
    ],
    // 组织管理
    'dept' => [
        // 部门管理
        'dept' => [
            'page_path' => '/organization/department',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['dept.dept/lists', 'dept.dept/leaderDept'],
            ],
            'manage' => [
                'button_auth' => ['auth_all'],
                'action_auth' => [
                    'dept.dept/add',
                    'dept.dept/edit',
                    'dept.dept/delete',
                    'dept.dept/detail',
                ],
            ],
        ],
        // 岗位管理
        'jobs' => [
            'page_path' => '/organization/post',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['dept.jobs/lists'],
            ],
            'manage' => [
                'button_auth' => ['auth_all'],
                'action_auth' => [
                    'dept.jobs/add',
                    'dept.jobs/edit',
                    'dept.jobs/detail',
                    'dept.jobs/delete',
                ],
            ],
        ],
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
        //系统环境
        'environment' => [
            'page_path' => '/setting/system/environment',
            'view' => [
                'button_auth' => ['view'],
                'action_auth' => ['setting.system.system/info'],
            ],
        ],
        // 系统日志
        'systemlog'     => [
            'page_path'     => '/setting/system/journal',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['setting.system.log/lists'],
            ],
        ],
        //系统缓存
        'systemcache'     => [
            'page_path'     => '/setting/system/cache',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => [],
            ],
            'clear'     => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['setting.system.cache/clear'],
            ],
        ],
        //储存设置
        'storage'           => [
            'page_path'     => '/setting/storage/index',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['setting.storage/lists'],
            ],
            'manage'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => [
                    'setting.storage/change',
                    'setting.storage/detail',
                    'setting.storage/setup'
                ],
            ],
        ],
        // 个人设置
        'selfSetting'     => [
            'page_path'     => '/setting/personal/personal_data',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['auth.admin/myself'],
            ],
            'save'     => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['auth.admin/editself'],
            ],
        ],
        // 字典管理
        'dict'          => [
            'page_path'     => '/dict/type',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => [
                    'setting.dict.dicttype/lists',
                    'setting.dict.dictdata/lists',
                    'setting.dict.dicttype/detail',
                    'setting.dict.dictdata/detail',
                ],
            ],
            'manage'     => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => [
                    'setting.dict.dicttype/add',
                    'setting.dict.dicttype/edit',
                    'setting.dict.dicttype/delete',
                    'setting.dict.dictdata/add',
                    'setting.dict.dictdata/edit',
                    'setting.dict.dictdata/delete',
                ],
            ],
        ],
    ],

];
<?php
/**
 * name:菜单、权限名称
 * type：类型：1-菜单；2-权限
 * sons:子级菜单
 * ----auth_key：权限key(必须唯一)
 */
return [
    // 首页-工作台
    [
        'name' => '工作台',
        'type' => 1,
        'sons'    => [
            [
                'name'      => '查看',
                'type'      => 2,
                'auth_key'  => 'index/index.view'
            ]
        ],
    ],
    // 开发工具
    [
        'name' => '开发工具',
        'type' => 1,
        'sons' => [
            [
                'name' => '代码生成器',
                'type' => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'tools/generator.view'
                    ],
                    [
                        'name'      => '管理',
                        'type'      => 2,
                        'auth_key'  => 'tools/generator.manage'
                    ],
                ],
            ]
        ],
    ],
    // 组织管理
    [
        'name' => '组织管理',
        'type' => 1,
        'sons' => [
            [
                'name' => '部门管理',
                'type' => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'dept/dept.view'
                    ],
                    [
                        'name'      => '管理',
                        'type'      => 2,
                        'auth_key'  => 'dept/dept.manage'
                    ],
                ],
            ],
            [
                'name' => '岗位管理',
                'type' => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'dept/jobs.view'
                    ],
                    [
                        'name'      => '管理',
                        'type'      => 2,
                        'auth_key'  => 'dept/jobs.manage'
                    ],
                ]
            ],
        ],
    ],
    // 权限管理
    [
        'name' => '权限管理',
        'type' => 1,
        'sons' => [
            [
                'name' => '管理员',
                'type' => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'auth/permissions.view'
                    ],
                    [
                        'name'      => '管理',
                        'type'      => 2,
                        'auth_key'  => 'auth/permissions.manage'
                    ],
                ],
            ],
            [
                'name' => '角色',
                'type' => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'auth/role.view'
                    ],
                    [
                        'name'      => '管理',
                        'type'      => 2,
                        'auth_key'  => 'auth/role.manage'
                    ],
                ]
            ],
        ],
    ],
    // 系统设置
    [
        'name' => '系统设置',
        'type' => 1,
        'sons' => [
            [
                'name' => '网站信息',
                'type' => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/website.view'
                    ],
                    [
                        'name'      => '保存',
                        'type'      => 2,
                        'auth_key'  => 'setting/website.save'
                    ],
                ],
            ],
            [
                'name' => '备案信息',
                'type' => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/record.view'
                    ],
                    [
                        'name'      => '保存',
                        'type'      => 2,
                        'auth_key'  => 'setting/record.save'
                    ],
                ],
            ],
            [
                'name' => '系统环境',
                'type' => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/environment.view'
                    ],
                ],
            ],
            [
                'name'  => '系统日志',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/systemlog.view'
                    ],
                ],
            ],
            [
                'name'  => '系统缓存',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/systemcache.view'
                    ],
                    [
                        'name'      => '清除系统缓存',
                        'type'      => 2,
                        'auth_key'  => 'setting/systemcache.clear'
                    ],
                ],
            ],
            [
                'name'  => '储存设置',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/storage.view'
                    ],
                    [
                        'name'      => '管理',
                        'type'      => 2,
                        'auth_key'  => 'setting/storage.manage'
                    ],
                ],
            ],
            [
                'name'  => '个人设置',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/selfSetting.view'
                    ],
                    [
                        'name'      => '保存',
                        'type'      => 2,
                        'auth_key'  => 'setting/selfSetting.save'
                    ],
                ],
            ],
            [
                'name'  => '字典管理',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/dict.view'
                    ],
                    [
                        'name'      => '管理',
                        'type'      => 2,
                        'auth_key'  => 'setting/dict.manage'
                    ],
                ],
            ],
        ],
    ]
];




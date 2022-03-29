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
                'name'  => '政策协议',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/protocol.view'
                    ],
                    [
                        'name'      => '保存',
                        'type'      => 2,
                        'auth_key'  => 'setting/share.save'
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
                'name'  => '用户设置',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/user.view'
                    ],
                    [
                        'name'      => '保存',
                        'type'      => 2,
                        'auth_key'  => 'setting/user.save'
                    ],
                ],
            ],
            [
                'name'  => '登录注册',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/loginregister.view'
                    ],
                    [
                        'name'      => '保存',
                        'type'      => 2,
                        'auth_key'  => 'setting/loginregister.save'
                    ],
                ],
            ],
            [
                'name'  => '定时任务',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/task.view'
                    ],
                    [
                        'name'      => '管理',
                        'type'      => 2,
                        'auth_key'  => 'setting/task.manage'
                    ],
                ],
            ],
        ],
    ]
];




<?php
/**
 * name:菜单、权限名称
 * type：类型：1-菜单；2-权限
 * sons:子级菜单
 * ----auth_key：权限key(必须唯一)
 */
return [
    //首页
    [
        'name'  => '首页',
        'type'  => 1,
        'sons'  => [
            [
                'name'    => '首页',
                'type'    => 1,
                'sons'    => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'index/index.view'
                    ]
                ],
            ]
        ]

    ],
    //设置
    [
        'name'  => '设置',
        'type'  => 1,
        'sons'=>[
            [
                'name'  => '店铺信息',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/shop.view'
                    ],
                    [
                        'name'      => '保存',
                        'type'      => 2,
                        'auth_key'  => 'setting/shop.save'
                    ],
                ],
            ],
            [
                'name'  => '备案信息',
                'type'  => 1,
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
                'name'  => '管理员',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/permissions.view'
                    ],
                    [
                        'name'      => '管理',
                        'type'      => 2,
                        'auth_key'  => 'setting/permissions.manage'
                    ],
                ],
            ],
            [
                'name'  => '角色',
                'type'  => 1,
                'sons'  => [
                    [
                        'name'      => '查看',
                        'type'      => 2,
                        'auth_key'  => 'setting/role.view'
                    ],
                    [
                        'name'      => '管理',
                        'type'      => 2,
                        'auth_key'  => 'setting/role.manage'
                    ],
                ]
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
        ]
    ]
];




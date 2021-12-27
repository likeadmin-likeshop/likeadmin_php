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
    //首页
    'index'     => [
        //控制台
        'index' => [
            'page_path'     => '/index',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['workbench/index'],
            ],
        ]
    ],
    //数据
    'data'      => [
        //流量分析
        'flowanalysis'=> [
            'page_path'     => '/data/flow_analysis',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['data.center/trafficanalysis'],
            ],
        ],
        //用户分析
        'user'    => [
            'page_path'     => '/data/user',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['data.center/userAnalysis'],
            ],
        ],
        //交易分析
        'transaction'    => [
            'page_path'     => '/data/transaction',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['data.center/transactionanalysis'],
            ],
        ],
        //商品分析
        'goods'    => [
            'page_path'     => '/data/goods/goods',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['data.center/goodsanalysis'],
            ],
        ],
        //交易设置
        'goodsrank'  => [
            'page_path'     => '/data/goods/ranking',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['data.center/goodstop'],
            ],
        ],
    ],
    //设置
    'setting'   => [
        //店铺信息
        'shop'      => [
            'page_path'     => '/setting/shop/shop',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.shop.shopsetting/getshopinfo'],
            ],
            'save'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['settings.shop.shopsetting/setconfig'],
            ],
        ],
        //备案信息
        'record'      => [
            'page_path'     => '/setting/shop/record',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.shop.shopsetting/getrecordinfo'],
            ],
            'save'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['settings.shop.shopsetting/setrecordinfo'],
            ],
        ],
        //分享信息
        'share'     => [
            'page_path'     => '/setting/shop/share',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.shop.shopsetting/getsharesetting'],
            ],
            'save'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['settings.shop.shopsetting/setsharesetting'],
            ],
        ],
        //政策协议
        'protocol'     => [
            'page_path'     => '/setting/shop/protocol',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.shop.shopsetting/getpolicyagreement'],
            ],
            'save'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['settings.shop.shopsetting/setpolicyagreement'],
            ],
        ],
        //支付方式
        'paymethod'     => [
            'page_path'     => '/setting/payment/pay_method',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.pay.payway/getpayway'],
            ],
            'save'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.pay.payway/setpayway'],
            ],
        ],
        //支付配置
        'payconfig'     => [
            'page_path'     => '/setting/payment/pay_config',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.pay.payconfig/lists'],
            ],
            'edit'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => [
                    'settings.pay.payway/getconfig',
                    'settings.pay.payway/setconfig',
                ],
            ],
        ],
        //配送方式
        'delivery'      => [
            'page_path'     => '/setting/delivery/index',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.delivery.deliveryway/getconfig'],
            ],
            'manage'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => [
                    'settings.delivery.deliveryway/setconfig',
                    'settings.delivery.freight/lists',
                    'settings.delivery.freight/add',
                    'settings.delivery.freight/edit',
                    'settings.delivery.freight/del',
                    'settings.delivery.express/lists',
                    'settings.delivery.express/add',
                    'settings.delivery.express/edit',
                    'settings.delivery.express/del',
                    'settings.delivery.logisticsconfig/getlogisticsconfig',
                    'settings.delivery.logisticsconfig/setlogisticsconfig',
                ],
            ],
        ],
        //管理员
        'permissions'   => [
            'page_path'     => '/setting/permissions/admin',
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
            'page_path'     => '/setting/permissions/role',
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
                    'auth.role/getMenu',
                    'auth.role/del',
                ],
            ],
        ],
        //商品设置
        'goods'         => [
            'page_path'     => '/setting/goods/goods',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.goods.goodssettings/getconfig'],
            ],
            'save'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['settings.goods.goodssettings/setconfig'],
            ],
        ],
        //用户设置
        'user'          => [
            'page_path'     => '/setting/user/user_setting',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.user.user/getconfig'],
            ],
            'save'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['settings.user.user/setconfig'],
            ],
        ],
        //登录注册
        'loginregister' => [
            'page_path'     => '/setting/user/login_register',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.user.user/getregisterconfig'],
            ],
            'save'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['settings.user.user/setregisterconfig'],
            ],
        ],
        //用户提现
        'withdrawdeposit'   => [
            'page_path'     => '/setting/user/withdraw_deposit',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.user.user/getwithdrawconfig'],
            ],
            'save'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['settings.user.user/setwithdrawconfig'],
            ],
        ],
        //订单设置
        'order'             => [
            'page_path'     => '/setting/order/order',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.order.transaction_settings/getconfig'],
            ],
            'save'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['settings.order.transaction_settings/setconfig'],
            ],
        ],
        //储存设置
        'storage'           => [
            'page_path'     => '/setting/storage/index',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.shop.storage/lists'],
            ],
            'manage'      => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => [
                    'settings.order.storage/change',
                    'settings.shop.storage/index',
                    'settings.shop.storage/setup'
                ],
            ],
        ],
        //系统日志
        'systemlog'     => [
            'page_path'     => '/setting/system_maintain/journal',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['settings.system.log/lists'],
            ],
        ],
        //系统缓存
        'systemcache'     => [
            'page_path'     => '/setting/system_maintain/cache',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => [],
            ],
            'clear'     => [
                'button_auth'   => ['auth_all'],
                'action_auth'   => ['settings.system.cache/clear'],
            ],
        ],
        //系统更新
        'systemupdate'     => [
            'page_path'     => '/setting/system_maintain/update',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => [],
            ],
        ],
        //异常日志
        'errorlog'     => [
            'page_path'     => '/setting/system_maintain/error_journal',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => [],
            ],
        ],
        //计划任务
        'task'     => [
            'page_path'     => '/setting/task',
            'view'      => [
                'button_auth'   => ['view'],
                'action_auth'   => ['crontab.crontab/lists'],
            ],
            'manage'    => [
                'button_auth'   => ['view'],
                'action_auth'   => [
                    'crontab.crontab/add',
                    'crontab.crontab/edit',
                    'crontab.crontab/operate',
                    'crontab.crontab/del',
                ],
            ],
        ],
    ],
];
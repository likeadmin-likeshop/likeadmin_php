export const NAVBAR = [
    {
        name: '首页',
        path: '/'
    },
    {
        name: '资讯中心',
        path: '/information',
        component: 'information'
    },
    {
        name: '移动端',
        path: '/mobile',
        component: 'mobile'
    },
    {
        name: '管理后台',
        path: '/admin',
        component: 'admin'
    }
]

export const SIDEBAR = [
    {
        module: 'personal',
        hidden: true,
        children: [
            {
                name: '个人中心',
                path: '/user',
                children: [
                    {
                        name: '个人信息',
                        path: 'info'
                    },
                    {
                        name: '我的收藏',
                        path: 'collection'
                    }
                ]
            },

            {
                name: '账户设置',
                path: '/account',
                children: [
                    {
                        name: '账户安全',
                        path: 'security'
                    }
                ]
            }
        ]
    }
]

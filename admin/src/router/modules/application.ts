import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
    path: '/application',
    redirect: '/application/notification',
    component: RouterView,
    meta: { title: '应用管理', icon: 'icon-setting' },
    children: [
        {
            path: '/application/notification',
            redirect: '/application/notification/index',
            component: RouterView,
            meta: { title: '消息通知' },
            children: [
                {
                    path: '/application/notification/index',
                    component: () => import('@/views/application/notification/index.vue'),
                    meta: { title: '通知设置', permission: ['view'] },
                },
                {
                    path: '/application/notification/detail',
                    component: () => import('@/views/application/notification/detail.vue'),
                    meta: { hidden: true, title: '通知设置', permission: ['view'] },
                },
                {
                    path: '/application/sms/index',
                    component: () => import('@/views/application/sms/index.vue'),
                    meta: { title: '短信设置', permission: ['view'] },
                },
                {
                    path: '/application/sms/detail',
                    component: () => import('@/views/application/sms/detail.vue'),
                    meta: { hidden: true, title: '短信设置', permission: ['view'] },
                },
            ],
        },
    ],
}

export default routes

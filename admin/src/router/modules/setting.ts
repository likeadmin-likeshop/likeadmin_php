import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
    path: '/setting',
    redirect: '/setting/service',
    component: RouterView,
    meta: { title: '系统设置', icon: 'icon-setting' },
    children: [
        {
            path: '/setting/service',
            redirect: '/setting/service/online_service',
            component: RouterView,
            meta: { title: '客服设置' },
            children: [
                {
                    path: '/setting/service/online_service',
                    component: () => import('@/views/setting/service/online_service.vue'),
                    meta: {
                        title: '在线客服',
                    },
                },
            ],
        },
        {
            path: '/setting/website',
            redirect: '/setting/website/information',
            component: RouterView,
            meta: { title: '网站设置' },
            children: [
                {
                    path: '/setting/website/information',
                    component: () => import('@/views/setting/website/information.vue'),
                    meta: {
                        title: '网站信息',
                        permission: ['view'],
                    },
                },
                {
                    path: '/setting/website/filing',
                    component: () => import('@/views/setting/website/filing.vue'),
                    meta: {
                        title: '备案信息',
                        permission: ['view'],
                    },
                },
                {
                    path: '/setting/website/protocol',
                    component: () => import('@/views/setting/website/protocol.vue'),
                    meta: {
                        title: '政策/协议',
                        permission: ['view'],
                    },
                },
            ],
        },
        {
            path: '/setting/user',
            redirect: '/setting/user',
            component: RouterView,
            meta: { title: '用户设置' },
            children: [
                {
                    path: '/setting/user',
                    component: () => import('@/views/setting/user/index.vue'),
                    meta: {
                        title: '用户设置',
                        permission: ['view'],
                    },
                },
                {
                    path: '/setting/user/login',
                    component: () => import('@/views/setting/user/login.vue'),
                    meta: {
                        title: '登录注册',
                        permission: ['view'],
                    },
                },
            ],
        },
        {
            path: '/setting/system',
            redirect: '/setting/system/environment',
            component: RouterView,
            meta: { title: '系统维护' },
            children: [
                {
                    path: '/setting/website/environment',
                    component: () => import('@/views/setting/system/environment.vue'),
                    meta: {
                        title: '系统环境',
                        permission: ['view'],
                    },
                },
            ],
        },
    ],
}

export default routes

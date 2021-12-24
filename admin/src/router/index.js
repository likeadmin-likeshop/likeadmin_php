import { createRouter, createWebHistory, RouterView } from 'vue-router'
import workbench from '@/views/workbench'
import Layout from '@/layout'
import Error404 from '@/views/error/404'

export const asyncRoutes = [
    {
        path: '/',
        redirect: 'workbench',
        component: Layout,
        children: [
            {
                path: '/workbench',
                component: workbench,
                meta: { title: '工作台' },
            },
            {
                path: '/permission',
                redirect: '/permission/admin',
                component: RouterView,
                meta: { title: '权限管理' },
                children: [
                    {
                        path: '/permission/admin',
                        component: () => import('@/views/permission/admin'),
                        meta: { title: '管理员' },
                    },
                    {
                        path: '/permission/role',
                        component: () => import('@/views/permission/role'),
                        meta: { title: '角色' },
                    },
                ],
            },
            {
                path: '/setting',
                redirect: '/setting',
                component: RouterView,
                meta: { title: '系统设置' },
                children: [
                    {
                        path: '/setting/website',
                        redirect: '/setting/website/information',
                        component: RouterView,
                        meta: { title: '网站设置' },
                        children: [
                            {
                                path: '/setting/website/information',
                                component: () => import('@/views/setting/website/information'),
                                meta: { title: '网站信息' },
                            },
                            {
                                path: '/setting/website/filing',
                                component: () => import('@/views/setting/website/filing'),
                                meta: { title: '备案信息' },
                            },
                        ]
                    },
                    {
                        path: '/setting/system',
                        redirect: '/setting/system/environment',
                        component: RouterView,
                        meta: { title: '系统维护' },
                        children: [
                            {
                                path: '/setting/website/environment',
                                component: () => import('@/views/setting/system/environment'),
                                meta: { title: '系统环境' },
                            }
                        ]
                    },
                ],
            },
        ],
    },
]

export const constRoutes = [
    {
        path: '/login',
        component: () => import('@/views/account/login'),
    },
    { path: '/:pathMatch(.*)*', name: '404', component: Error404 },
]

const router = createRouter({
    routes: [...asyncRoutes, ...constRoutes],
    history: createWebHistory(),
})

export default router

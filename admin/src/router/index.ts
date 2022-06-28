import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import workbench from '@/views/workbench/index.vue'
import Layout from '@/layout/index.vue'
import Error404 from '@/views/error/404.vue'
import Error500 from '@/views/error/500.vue'
// Router modules
import setting from './modules/setting'
import permission from './modules/permission'
import decoration from './modules/decoration'
import content from './modules/content'
import channel from './modules/channel'
import devTools from './modules/dev_tools'
import organization from './modules/organization'
//{GENERATOR_IMPORT_TAG}

export const asyncRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: 'workbench',
        component: Layout,
        children: [
            {
                path: '/workbench',
                component: workbench,
                meta: { title: '工作台', icon: 'icon_dianpu_home', permission: ['view'] }
            },
			// decoration, // 装修管理
            // application,// 应用管理
            // content, 	// 内容管理
			// channel, 	// 渠道管理
            devTools,
			organization,	// 组织管理
            permission,		// 权限管理
            setting,		// 系统设置
            //{GENERATOR_ROUTER_TAG}
        ]
    }
]

export const constRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        component: () => import('@/views/account/login.vue')
    },
    {
        path: '/error/500',
        component: Error500
    },
    { path: '/:pathMatch(.*)*', name: '404', component: Error404 }
]

export const getAsyncRoutes = () => {
    return asyncRoutes
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...asyncRoutes, ...constRoutes]
})

export default router

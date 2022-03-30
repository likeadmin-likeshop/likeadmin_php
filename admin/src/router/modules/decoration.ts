import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
    path: '/decoration',
    redirect: '/decoration/home',
    component: RouterView,
    meta: { title: '装修管理', icon: 'icon-setting' },
    children: [
        {
            path: '/decoration/home',
            component: () => import('@/views/decoration/home.vue'),
            meta: { title: '首页装修' },
        },
        {
            path: '/decoration/home_edit',
            component: () => import('@/views/decoration/home_edit.vue'),
            meta: { title: '首页装修', parent: '/decoration/home', hidden: true },
        },
        {
            path: '/decoration/tabbar',
            component: () => import('@/views/decoration/tabbar.vue'),
            meta: { title: '底部标签栏' },
        },

        {
            path: '/decoration/advertising',
            component: () => import('@/views/decoration/advertising.vue'),
            meta: { title: '广告管理' },
        },
        {
            path: '/decoration/advertising_edit',
            component: () => import('@/views/decoration/advertising_edit.vue'),
            meta: { title: '广告管理', parent: '/decoration/advertising', hidden: true },
        },
    ],
}

export default routes

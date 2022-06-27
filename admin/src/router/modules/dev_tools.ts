import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
    path: '/dev_tools',
    redirect: '/dev_tools/form',
    component: RouterView,
    meta: { title: '开发工具', icon: 'icon_set_weihu' },
    children: [

        {
            path: '/dev_tools/code',
            component: () => import('@/views/dev_tools/code/index.vue'),
            meta: { title: '代码生成器' },
        },
        {
            path: '/dev_tools/code/edit',
            component: () => import('@/views/dev_tools/code/edit.vue'),
            meta: { hidden: true, title: '编辑', parent: '/dev_tools/code' },
        },
        {
            path: '/dev_tools/form',
            component: () => import('@/views/dev_tools/form.vue'),
            meta: { title: '表单设计器' },
        }
    ],
}

export default routes

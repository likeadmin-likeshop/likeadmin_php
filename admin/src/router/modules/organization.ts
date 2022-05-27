import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
    path: '/organization',
    redirect: '/organization/department',
    component: RouterView,
    meta: { title: '组织管理', icon: 'icon-quanxian' },
    children: [
        {
            path: '/organization/department',
            component: () => import('@/views/organization/department/index.vue'),
            meta: { title: '部门管理', permission: ['view'] }
        },
        {
            path: '/organization/department/edit',
            component: () => import('@/views/organization/department/edit.vue'),
            meta: {
                title: '部门管理',
                parent: '/organization/department',
                hidden: true
            }
        },
        {
            path: '/organization/post',
            component: () => import('@/views/organization/post/index.vue'),
            meta: { title: '岗位管理', permission: ['view'] }
        },
        {
            path: '/organization/post/edit',
            component: () => import('@/views/organization/post/edit.vue'),
            meta: {
                title: '岗位管理',
                parent: '/organization/post',
                hidden: true
            }
        }
    ]
}

export default routes

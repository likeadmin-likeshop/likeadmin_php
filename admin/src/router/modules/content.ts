import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
    path: '/content',
    redirect: '/content/advertising',
    component: RouterView,
    meta: { title: '内容管理', icon: 'icon-setting' },
    children: [
        // {
        //     path: '/content/advertising',
        //     redirect: '/content/advertising/lists',
        //     component: RouterView,
        //     meta: { title: '广告管理' },
        //     children: [
        //         {
        //             path: '/content/advertising/lists',
        //             component: () => import('@/views/content/advertising/advertising.vue'),
        //             meta: { title: '广告列表' },
        //         },
        //         {
        //             path: '/content/advertising/advertising_edit',
        //             component: () => import('@/views/decoration/advertising_edit.vue'),
        //             meta: {
        //                 title: '广告列表',
        //                 parent: '/content/advertising/lists',
        //                 hidden: true,
        //             },
        //         },
        //         {
        //             path: '/content/advertising/position',
        //             component: () => import('@/views/content/advertising/position.vue'),
        //             meta: { title: '广告位' },
        //         },
        //     ],
        // },
        {
            path: '/content/information',
            redirect: '/content/information/lists',
            component: RouterView,
            meta: { title: '资讯管理' },
            children: [
                {
                    path: '/content/information/lists',
                    component: () => import('@/views/content/information/lists.vue'),
                    meta: { title: '资讯列表' },
                },
                {
                    path: '/content/information/information_edit',
                    component: () => import('@/views/content/information/information_edit.vue'),
                    meta: {
                        title: '资讯列表',
                        parent: '/content/information/lists',
                        hidden: true,
                    },
                },
                {
                    path: '/content/information/position',
                    component: () => import('@/views/content/information/category.vue'),
                    meta: { title: '资讯分类' },
                },
            ],
        },
    ],
}

export default routes

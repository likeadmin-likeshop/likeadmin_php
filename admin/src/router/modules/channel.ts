import { RouteRecordRaw, RouterView } from "vue-router"
const routes: RouteRecordRaw = {
    path: '/channel',
    name: 'channel',
    meta: { title: '渠道管理', icon: 'icon-setting' },
    component: RouterView,
    children: [{
        path: '/channel/mp_wechat',
        name: 'mp_wechat',
        meta: {
            title: '微信公众号',
            parentPath: '/channel',
        },
        component: RouterView,
        children: [{
            path: '/channel/mp_wechat/index',
            name: 'mp_wechat_index',
            meta: {
                title: '渠道设置',
                parentPath: '/channel',
                permission: ['view']
            },
            component: () => import('@/views/channel/mp_wechat/index.vue'),
        }, {
            path: '/channel/mp_wechat/menu',
            name: 'mp_wechat_menu',
            meta: {
                title: '菜单管理',
                parentPath: '/channel',
                permission: ['view']
            },
            component: () => import('@/views/channel/mp_wechat/menu.vue'),
        }, {
            path: '/channel/mp_wechat/reply/follow_reply',
            name: 'follow_reply',
            meta: {
                title: '关注回复',
                parentPath: '/channel',
                permission: ['view']
            },
            component: () => import('@/views/channel/mp_wechat/reply/follow_reply.vue'),
        }, {
            path: '/channel/mp_wechat/reply/keyword_reply',
            name: 'keyword_reply',
            meta: {
                title: '关键字回复',
                parentPath: '/channel',
                permission: ['view']
            },
            component: () => import('@/views/channel/mp_wechat/reply/keyword_reply.vue'),
        }, {
            path: '/channel/mp_wechat/reply/default_reply',
            name: 'default_reply',
            meta: {
                title: '默认回复',
                parentPath: '/channel',
                permission: ['view']
            },
            component: () => import('@/views/channel/mp_wechat/reply/default_reply.vue'),
        }, {
            path: '/channel/mp_wechat/reply/reply_edit',
            name: 'reply_edit',
            meta: {
                title: '默认编辑',
                parentPath: '/channel',
                hidden: true,
                permission: ['view']
            },
            component: () => import('@/views/channel/mp_wechat/reply/reply_edit.vue'),
        }]
    }, {
        path: '/channel/wechat_app',
        name: 'wechat_app',
        meta: {
            title: '微信小程序',
            parentPath: '/channel'
        },
        component: () => import('@/views/channel/wechat_app/index.vue')
    }, {
        path: '/channel/app_store',
        name: 'app_store',
        meta: {
            title: 'APP',
            parentPath: '/channel',
        },
        component: () => import('@/views/channel/app_store/index.vue'),
    }, {
        path: '/channel/h5_store',
        name: 'h5_store',
        meta: {
            title: 'H5',
            parentPath: '/channel',
        },
        component: () => import('@/views/channel/h5_store/index.vue')
    }, {
        path: '/wechat/wechat_platform',
        name: 'wechat_platform',
        meta: {
            title: '微信开放平台',
            parentPath: '/channel',
        },
        component: () => import('@/views/channel/wechat_platform/index.vue')
    }]
}

export default routes
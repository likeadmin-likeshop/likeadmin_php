/**
 * 权限控制
 */

import NProgress from 'nprogress'
import store from './store'
import router from './router'
import 'nprogress/nprogress.css'
import { findFirstValidRoute } from './router/util'
import { indexRoute, indexRouteName } from './router/static'
import { isExternal } from './utils/validate'

// NProgress配置
NProgress.configure({ showSpinner: false })

const loginPath = '/login'
const defaultPath = '/'
// 免登录白名单
const whiteList = ['/login', '/403']

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    // 开始 Progress Bar
    to.meta?.title && (document.title = to.meta.title as string)
    const token = store.getters.token

    if (token) {
        // 获取用户信息
        if (Object.keys(store.getters.userInfo).length === 0) {
            await store.dispatch('user/getInfo')
            const routes = store.getters.sidebar
            // 没有菜单跳转到403页面
            if (!routes.length) {
                await store.dispatch('user/logout')
                store.dispatch('user/clearUserCache')
                next('/403')
            }
            // 找到第一个有效路由
            //@ts-ignore
            indexRoute.redirect = { name: findFirstValidRoute(routes) }
            // 动态添加index路由
            router.addRoute(indexRoute)
            routes.forEach((route: any) => {
                // https 则不插入
                if (isExternal(route.path)) {
                    return
                }
                if (!route.children) {
                    router.addRoute(indexRouteName, route)
                    return
                }
                router.addRoute(route) // 动态添加可访问路由表
            })
            if (to.path === loginPath) {
                next({ path: defaultPath })
            } else {
                next({ ...to, replace: true })
            }
        } else {
            next()
        }
    } else if (whiteList.includes(to.path as string)) {
        // 在免登录白名单，直接进入
        next()
    } else {
        next({ path: loginPath, query: { redirect: to.fullPath } })
    }
})

router.afterEach(async (to, from) => {
    NProgress.done()
})

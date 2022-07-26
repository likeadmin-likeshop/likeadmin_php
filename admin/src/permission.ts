/**
 * 权限控制
 */

import NProgress from 'nprogress'
import router, { findFirstValidRoute } from './router'
import 'nprogress/nprogress.css'
import { isExternal } from './utils/validate'
import useUserStore from './stores/modules/user'
import { indexRoute, INDEX_ROUTE_NAME } from './router/routes'

// NProgress配置
NProgress.configure({ showSpinner: false })

const loginPath = '/login'
const defaultPath = '/'
// 免登录白名单
const whiteList = ['/login', '/403']

router.beforeEach(async (to, from, next) => {
    console.log(to)
    // 开始 Progress Bar
    NProgress.start()
    const userStore = useUserStore()
    if (userStore.token) {
        // 获取用户信息
        const hasGetUserInfo = Object.keys(userStore.userInfo).length !== 0
        if (hasGetUserInfo) {
            if (to.path === loginPath) {
                next({ path: defaultPath })
            } else {
                next()
            }
        } else {
            try {
                await userStore.getUserInfo()
                const routes = userStore.routes
                // 找到第一个有效路由
                indexRoute.redirect = { name: findFirstValidRoute(routes) }
                // 动态添加index路由
                router.addRoute(indexRoute)
                routes.forEach((route: any) => {
                    // https 则不插入
                    if (isExternal(route.path)) {
                        return
                    }
                    if (!route.children) {
                        router.addRoute(INDEX_ROUTE_NAME, route)
                        return
                    }
                    // 动态添加可访问路由表
                    router.addRoute(route)
                })
                next({ ...to, replace: true })
            } catch (err) {
                userStore.resetLoginInfo()
                next({ path: loginPath, query: { redirect: to.fullPath } })
            }
        }
    } else if (whiteList.includes(to.path)) {
        // 在免登录白名单，直接进入
        next()
    } else {
        next({ path: loginPath, query: { redirect: to.fullPath } })
    }
})

router.afterEach(() => {
    // console.log(router.getRoutes())
    NProgress.done()
})

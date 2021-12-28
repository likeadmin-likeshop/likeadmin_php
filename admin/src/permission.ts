/**
 * 权限控制
 */

import NProgress from "nprogress";
import store from "./store";
import router, { asyncRoutes } from "./router";
import "nprogress/nprogress.css";

// NProgress配置
NProgress.configure({ showSpinner: false });

const loginPath = '/login'
const defaultPath = '/'
// 免登录白名单
const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    store.commit("permission/setSidebar", asyncRoutes[0].children);
    // 开始 Progress Bar
	to.meta?.title && (document.title = to.meta.title as string)
	const token = store.state.user.token;
	console.log(store.state)
	if (token) {
        if (to.path === loginPath) {
            next({ path: defaultPath })
        } else {
            next();
        }
    } else {
        if (whiteList.includes(to.path as string)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next({ path: loginPath, query: { redirect: to.fullPath } })
        }
    }
});

router.afterEach(async (to, from) => {
    NProgress.done();
});

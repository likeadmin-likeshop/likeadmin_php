/**
 * 权限控制
 */

import NProgress from "nprogress";
import store from "./store";
import router, { asyncRoutes } from "./router";
import "nprogress/nprogress.css";

// NProgress配置
NProgress.configure({ showSpinner: false });

// 白名单
const allowList = ["/login"];

router.beforeEach(async (to, from, next) => {
    store.commit("permission/setSidebar", asyncRoutes[0].children);
    // 开始 Progress Bar
    NProgress.start();
    next();
});

router.afterEach(async (to, from) => {
    NProgress.done();
});

import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
    RouterView,
} from "vue-router";
import workbench from "@/views/workbench/index.vue";
import Layout from "@/layout/index.vue";
import Error404 from "@/views/error/404.vue";
export const asyncRoutes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "workbench",
        component: Layout,
        children: [
            {
                path: "/workbench",
                component: workbench,
                meta: { title: "工作台" },
            },
            {
                path: "/permission",
                redirect: "/permission/admin",
                component: RouterView,
                meta: { title: "权限管理" },
                children: [
                    {
                        path: "/permission/admin",
                        component: () =>
                            import("@/views/permission/admin/index.vue"),
                        meta: { title: "管理员" },
                    },
                    {
                        path: "/permission/admin/edit",
                        component: () =>
                            import("@/views/permission/admin/edit.vue"),
                        meta: {
                            title: "管理员",
                            parent: "/permission/admin",
                            hidden: true,
                        },
                    },
                    {
                        path: "/permission/role",
                        component: () =>
                            import("@/views/permission/role/index.vue"),
                        meta: { title: "角色" },
                    },
                ],
            },
            {
                path: "/setting",
                redirect: "/setting",
                component: RouterView,
                meta: { title: "系统设置" },
                children: [
                    {
                        path: "/setting/website",
                        redirect: "/setting/website/information",
                        component: RouterView,
                        meta: { title: "网站设置" },
                        children: [
                            {
                                path: "/setting/website/information",
                                component: () =>
                                    import(
                                        "@/views/setting/website/information.vue"
                                    ),
                                meta: { title: "网站信息" },
                            },
                            {
                                path: "/setting/website/filing",
                                component: () =>
                                    import(
                                        "@/views/setting/website/filing.vue"
                                    ),
                                meta: { title: "备案信息" },
                            },
                        ],
                    },
                    {
                        path: "/setting/system",
                        redirect: "/setting/system/environment",
                        component: RouterView,
                        meta: { title: "系统维护" },
                        children: [
                            {
                                path: "/setting/website/environment",
                                component: () =>
                                    import(
                                        "@/views/setting/system/environment.vue"
                                    ),
                                meta: { title: "系统环境" },
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const constRoutes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        component: () => import("@/views/account/login.vue"),
    },
    { path: "/:pathMatch(.*)*", name: "404", component: Error404 },
];

export const getAsyncRoutes = () => {
    return asyncRoutes;
};

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [...asyncRoutes, ...constRoutes],
});

export default router;

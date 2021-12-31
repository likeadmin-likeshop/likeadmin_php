import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
} from "vue-router";
import workbench from "@/views/workbench/index.vue";
import Layout from "@/layout/index.vue";
import Error404 from "@/views/error/404.vue";
// Router modules
import setting from './modules/setting'
import permission from './modules/permission'
export const asyncRoutes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "workbench",
        component: Layout,
        children: [
            {
                path: "/workbench",
                component: workbench,
                meta: { title: "工作台", icon: 'icon-home', permission: ["view"] },
            },
            permission,
            setting,

          
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

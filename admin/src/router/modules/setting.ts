import { RouteRecordRaw, RouterView } from "vue-router";

const routes: RouteRecordRaw = {
    path: "/setting",
    redirect: "/setting",
    component: RouterView,
    meta: { title: "系统设置", icon: "icon-setting" },
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
                        import("@/views/setting/website/information.vue"),
                    meta: {
                        title: "网站信息",
                        permission: ["view"],
                    },
                },
                {
                    path: "/setting/website/filing",
                    component: () =>
                        import("@/views/setting/website/filing.vue"),
                    meta: {
                        title: "备案信息",
                        permission: ["view"],
                    },
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
                        import("@/views/setting/system/environment.vue"),
                    meta: {
                        title: "系统环境",
                        permission: ["view"],
                    },
                },
            ],
        },
    ],
};

export default routes
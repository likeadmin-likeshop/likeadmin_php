import 'vue-router'
declare module 'vue-router' {
    // 扩展 RouteMeta
    interface RouteMeta {
        module?: string
        activeMenu?: string
    }
}

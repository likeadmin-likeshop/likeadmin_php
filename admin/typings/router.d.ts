import 'vue-router'
declare module 'vue-router' {
    // 扩展 RouteMeta
    interface RouteMeta {
        title?: string
        icon?: string
        hidden?: boolean
        activeMenu?: string
        hideTab?: boolean
    }
}

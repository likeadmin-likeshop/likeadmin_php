import 'vue-router'

declare module 'vue-router' {
    // 扩展 RouteMeta
    interface RouteMeta {
        type?: string
        perms?: string
        title?: string
        icon?: string
        hidden?: boolean
        activeMenu?: string
        hideTab?: boolean
        keepAlive?: boolean
    }
}

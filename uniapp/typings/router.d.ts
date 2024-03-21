import 'uniapp-router-next'
declare module 'uniapp-router-next' {
    // 扩展 RouteMeta
    interface RouteMeta {
        share?: boolean
        auth?: boolean
        white?: string
        isTab?: boolean
    }
}

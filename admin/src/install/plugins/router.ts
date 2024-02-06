import router from '@/router'
import { registerRouteGuard } from '@/router/guard'
import type { App } from 'vue'

export default (app: App<Element>) => {
    registerRouteGuard(router)
    app.use(router)
}

import type { App } from 'vue'

import router from '@/router'
import { registerRouteGuard } from '@/router/guard'

export default (app: App<Element>) => {
    registerRouteGuard(router)
    app.use(router)
}

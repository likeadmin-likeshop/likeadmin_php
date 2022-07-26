import router from '@/router'
import type { App } from 'vue'

export default (app: App<Element>) => {
    app.use(router)
}

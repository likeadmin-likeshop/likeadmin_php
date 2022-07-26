import store from '@/stores'
import type { App } from 'vue'

export default (app: App<Element>) => {
    app.use(store)
}

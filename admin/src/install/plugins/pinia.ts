import type { App } from 'vue'

import store from '@/stores'

export default (app: App<Element>) => {
    app.use(store)
}

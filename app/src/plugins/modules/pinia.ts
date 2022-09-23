import { App } from 'vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
export default (app: App) => {
    app.use(pinia)
}

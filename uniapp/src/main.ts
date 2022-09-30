import { createSSRApp } from 'vue'
import App from './App.vue'
import plugins from './plugins'
import { setupRouter } from './router'
import './styles/index.scss'
export function createApp() {
    const app = createSSRApp(App)

    Promise.resolve().then(() => {
        setupRouter()
    })
    app.use(plugins)
    return {
        app
    }
}

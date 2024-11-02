import { App } from 'vue'
import theme from './theme'
export function setupMixin(app: App) {
    app.mixin(theme)
}

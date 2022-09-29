import { isFunction } from '@vue/shared'
import { App } from 'vue'
const modules = import.meta.globEager('./modules/**/*.ts')

export default {
    install: (app: App) => {
        for (const module of Object.values(modules)) {
            const fun = module.default
            isFunction(fun) && fun(app)
        }
    }
}

import { App } from 'vue'

const modules = import.meta.globEager('./modules/*.ts')
export default (app: App<Element>) => {
    Object.keys(modules).forEach(key => {
        const name = key.replace(/^\.\/(.*)\.\w+$/, '$1')
        app.directive(name, modules[key].default)
    })
}

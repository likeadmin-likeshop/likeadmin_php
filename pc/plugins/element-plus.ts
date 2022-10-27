import { ElLoading } from 'element-plus'

export default defineNuxtPlugin((nuxtApp) => {
    const plugins = [ElLoading]
    for (const plugin of plugins) {
        nuxtApp.vueApp.use(plugin)
    }
})

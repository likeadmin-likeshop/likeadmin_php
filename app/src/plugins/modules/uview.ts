import { App } from 'vue'
import uView from '@/uni_modules/vk-uview-ui'

export default (app: App) => {
    // 使用 uView UI
    app.use(uView)
}

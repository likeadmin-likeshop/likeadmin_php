import { App } from '@vue/runtime-core'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElIcons from '@element-plus/icons-vue'
export default (app: App<Element>) => {
    app.use(ElementPlus, { zIndex: 3000, locale: zhCn })
    // 统一注册Icon图标
    Object.keys(ElIcons).forEach(item => {
        app.component(item, ElIcons[item as keyof typeof ElIcons])
    })
}

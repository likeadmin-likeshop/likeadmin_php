import { App } from '@vue/runtime-core'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIcons from '@element-plus/icons-vue'


const iconfonts: string[] = []
export default (app: App<Element>) => {
    app.use(ElementPlus, { zIndex: 3000, locale: zhCn })
    // 统一注册Icon图标
    // 全局注册ElementPlus图标
    for (const [key, component] of Object.entries(ElementPlusIcons)) {
        iconfonts.push(`el-icon-${component.name}`)
        app.component(key, component)
    }
}

export function getElementPlusIconNames() {
    return iconfonts
}

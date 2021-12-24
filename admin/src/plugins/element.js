import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElIconModules from '@element-plus/icons-vue'

export default (app) => {
    app.use(ElementPlus, { size: 'small', zIndex: 3000, locale: zhCn })
    // 统一注册Icon图标
    for (const iconName in ElIconModules) {
        if (Reflect.has(ElIconModules, iconName)) {
            const item = ElIconModules[iconName]
            app.component(iconName, item)
        }
    }
}

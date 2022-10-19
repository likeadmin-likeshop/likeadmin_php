import * as ElementPlusIcons from '@element-plus/icons-vue'
//@ts-ignore
const localIconsName: string[] = []

export const LOCAL_ICON_PREFIX = 'local-icon-'
export const EL_ICON_PREFIX = 'el-icon-'

const elIconsName: string[] = []

export function getElementPlusIconNames() {
    return elIconsName
}
export function getLocalIconNames() {
    return localIconsName
}

export default defineNuxtPlugin((nuxtApp) => {
    for (const [iconName, component] of Object.entries(ElementPlusIcons)) {
        const componenName = `${EL_ICON_PREFIX}${iconName}`
        elIconsName.push(componenName)
        nuxtApp.vueApp.component(componenName, component)
    }
})

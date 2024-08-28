import type { Router } from 'vue-router'

import useAppStore from '@/stores/modules/app'

export default function createInitGuard(router: Router) {
    router.beforeEach(async () => {
        const appStore = useAppStore()
        if (Object.keys(appStore.config).length == 0) {
            // 获取配置
            const data: any = await appStore.getConfig()

            // 设置网站logo
            let favicon: HTMLLinkElement = document.querySelector('link[rel="icon"]')!
            if (favicon) {
                favicon.href = data.web_favicon
            }
            favicon = document.createElement('link')
            favicon.rel = 'icon'
            favicon.href = data.web_favicon
            document.head.appendChild(favicon)
        }
    })
}

import { defineStore } from 'pinia'
import { getConfig } from '~~/api/app'

interface AppSate {
    config: Record<string, any>
}
export const useAppStore = defineStore({
    id: 'appStore',
    state: (): AppSate => ({
        config: {}
    }),
    getters: {
        getImageUrl: (state) => (url: string) =>
            url ? `${state.config.domain}${url}` : '',
        getWebsiteConfig: (state) => state.config.website || {},
        getLoginConfig: (state) => state.config.login || {},
        getCopyrightConfig: (state) => state.config.copyright || [],
        getQrcodeConfig: (state) => state.config.qrcode || {},
        getAdminUrl: (state) => state.config.admin_url
    },
    actions: {
        async getConfig() {
            const config = await getConfig()
            this.config = config
        }
    }
})

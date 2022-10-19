import { defineStore } from 'pinia'

interface AppSate {
    config: Record<string, any>
}
export const useAppStore = defineStore({
    id: 'appStore',
    state: (): AppSate => ({
        config: {}
    }),
    getters: {
        getWebsiteConfig: (state) => state.config.website || {},
        getLoginConfig: (state) => state.config.login || {}
    },
    actions: {
        getImageUrl(url: string) {
            return url ? `${this.config.domain}${url}` : ''
        }
    }
})

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
        getImageUrl: (state) => (url: string) =>
            url ? `${state.config.domain}${url}` : '',
        getWebsiteConfig: (state) => state.config.website || {},
        getLoginConfig: (state) => state.config.login || {},
        getCopyrightConfig: (state) => state.config.copyright || []
    },
    actions: {
        setConfig(config: any) {
            this.config = config
        }
    }
})

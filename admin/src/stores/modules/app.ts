import { defineStore } from 'pinia'

import { getConfig } from '@/api/app'

interface AppSate {
    config: Record<string, any>
    isMobile: boolean
    isCollapsed: boolean
    isRouteShow: boolean
}

const useAppStore = defineStore({
    id: 'app',
    state: (): AppSate => {
        return {
            config: {},
            isMobile: true,
            isCollapsed: false,
            isRouteShow: true
        }
    },
    actions: {
        getImageUrl(url: string) {
            return url.indexOf('http') ? `${this.config.oss_domain}${url}` : url
        },
        getConfig() {
            return new Promise((resolve, reject) => {
                getConfig()
                    .then((data) => {
                        this.config = data
                        resolve(data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        setMobile(value: boolean) {
            this.isMobile = value
        },
        toggleCollapsed(toggle?: boolean) {
            this.isCollapsed = toggle ?? !this.isCollapsed
        },
        refreshView() {
            this.isRouteShow = false
            nextTick(() => {
                this.isRouteShow = true
            })
        }
    }
})

export default useAppStore

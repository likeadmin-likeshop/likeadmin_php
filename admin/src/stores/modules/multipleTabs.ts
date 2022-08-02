import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

interface TabsSate {
    cacheTabList: Set<string>
    tabList: RouteLocationNormalized[]
}

const useTabsStore = defineStore({
    id: 'tabs',
    state: (): TabsSate => ({
        cacheTabList: new Set(),
        tabList: []
    }),
    getters: {
        getTabList(): RouteLocationNormalized[] {
            return this.tabList
        }
    },
    actions: {
        addTab(route: RouteLocationNormalized) {
            this.tabList.push({ ...route })
        }
    }
})

export default useTabsStore

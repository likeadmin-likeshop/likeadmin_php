import { defineStore } from 'pinia'
import { isExternal } from '@/utils/validate'
import type {
    LocationQuery,
    RouteLocationNormalized,
    RouteLocationRaw,
    RouteParamsRaw,
    Router,
    RouteRecordName
} from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

interface TabItem {
    name: RouteRecordName
    path: string
    title?: string
    query?: LocationQuery
    params?: RouteParamsRaw
}

interface TabsSate {
    cacheTabList: Set<string>
    tabList: TabItem[]
    tasMap: Record<string, TabItem>
}

const hasTab = (name: RouteRecordName, tabList: TabItem[]) => {
    return tabList.findIndex((item) => item.name == name) !== -1
}

const isCannotAddRoute = (route: RouteLocationNormalized) => {
    const { path, meta } = route
    if (!path || isExternal(path)) return true
    if (meta?.hideTab) return true
    if (([PageEnum.LOGIN, PageEnum.ERROR_403] as string[]).includes(path)) {
        return true
    }
    return false
}

const findTabsIndex = (path: string, tabList: TabItem[]) => {
    return tabList.findIndex((item) => item.path === path)
}

export const getRouteParams = (tabItem: TabItem) => {
    const { params, path, query } = tabItem
    return {
        params: params || {},
        path,
        query: query || {}
    }
}

const useTabsStore = defineStore({
    id: 'tabs',
    state: (): TabsSate => ({
        cacheTabList: new Set(),
        tabList: [],
        tasMap: {}
    }),
    getters: {
        getTabList(): TabItem[] {
            return this.tabList
        }
    },
    actions: {
        addTab(route: RouteLocationNormalized) {
            const { name, path, query, meta, params } = route
            if (isCannotAddRoute(route)) return
            if (hasTab(name!, this.tabList)) return

            const tabItem = {
                name: name!,
                path,
                title: meta?.title,
                query,
                params
            }
            this.tasMap[path] = tabItem
            this.tabList.push(tabItem)
        },
        removeTab(path: string, router: Router) {
            const { currentRoute, replace } = router
            const index = findTabsIndex(path, this.tabList)
            // 移除tab
            index !== -1 && this.tabList.splice(index, 1)

            if (path !== currentRoute.value.path) {
                return
            }
            // 删除选中的tab
            let toTab: TabItem | null = null
            let toRoute: RouteLocationRaw | null = null
            if (index === 0) {
                if (this.tabList.length === 0) {
                    toRoute = PageEnum.INDEX
                } else {
                    toTab = this.tabList[index + 1]
                }
            } else {
                toTab = this.tabList[index - 1]
            }
            toRoute = toTab ? getRouteParams(toTab) : toRoute
            replace(toRoute!)
        }
    }
})

export default useTabsStore

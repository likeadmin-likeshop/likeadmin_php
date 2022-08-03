import { defineStore } from 'pinia'
import { isExternal } from '@/utils/validate'
import type {
    LocationQuery,
    RouteLocationNormalized,
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
    indexRouteName: RouteRecordName
}

const getHasTabIndex = (path: string, tabList: TabItem[]) => {
    return tabList.findIndex((item) => item.path == path)
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
        tasMap: {},
        indexRouteName: ''
    }),
    getters: {
        getTabList(): TabItem[] {
            return this.tabList
        }
    },
    actions: {
        setRouteName(name: RouteRecordName) {
            this.indexRouteName = name
        },
        resetState() {
            this.cacheTabList = new Set()
            this.tabList = []
            this.tasMap = {}
            this.indexRouteName = ''
        },
        addTab(route: RouteLocationNormalized) {
            const { name, path, query, meta, params } = route
            if (isCannotAddRoute(route)) return
            const hasTabIndex = getHasTabIndex(path!, this.tabList)

            const tabItem = {
                name: name!,
                path,
                title: meta?.title,
                query,
                params
            }
            this.tasMap[path] = tabItem
            if (hasTabIndex != -1) {
                this.tabList.splice(hasTabIndex, 1, tabItem)
                return
            }
            this.tabList.push(tabItem)
        },
        removeTab(path: string, router: Router) {
            const { currentRoute, push } = router
            const index = findTabsIndex(path, this.tabList)
            // 移除tab
            if (this.tabList.length > 1) {
                index !== -1 && this.tabList.splice(index, 1)
            }
            if (path !== currentRoute.value.path) {
                return
            }
            // 删除选中的tab
            let toTab: TabItem | null = null

            if (index === 0) {
                toTab = this.tabList[index]
            } else {
                toTab = this.tabList[index - 1]
            }

            const toRoute = getRouteParams(toTab)
            push(toRoute)
        },
        removeOtherTab(path: string) {
            this.tabList = this.tabList.filter((item) => item.path == path)
        },
        removeAllTab(router: Router) {
            const { push, currentRoute } = router
            const { path, name } = unref(currentRoute)
            if (name == this.indexRouteName) {
                this.removeOtherTab(path)
                return
            }
            this.tabList = []
            push(PageEnum.INDEX)
        }
    }
})

export default useTabsStore

import useTabsStore from '@/stores/modules/multipleTabs'
import useSettingStore from '@/stores/modules/setting'

export default function useMultipleTabs() {
    const router = useRouter()
    const route = useRoute()
    const tabsStore = useTabsStore()
    const settingStore = useSettingStore()

    const tabsLists = computed(() => {
        return tabsStore.getTabList
    })

    const currentTab = computed(() => {
        return route.fullPath
    })

    const addTab = () => {
        if (!settingStore.openMultipleTabs) return
        tabsStore.addTab(router)
    }

    const removeTab = (fullPath?: any) => {
        if (!settingStore.openMultipleTabs) return
        fullPath = fullPath ?? route.fullPath
        tabsStore.removeTab(fullPath, router)
    }

    const removeOtherTab = () => {
        if (!settingStore.openMultipleTabs) return
        tabsStore.removeOtherTab(route)
    }

    const removeAllTab = () => {
        if (!settingStore.openMultipleTabs) return
        tabsStore.removeAllTab(router)
    }

    return {
        tabsLists,
        currentTab,
        addTab,
        removeTab,
        removeOtherTab,
        removeAllTab
    }
}

<template>
    <div class="app-container flex h-screen w-full">
        <div class="app-aside">
            <el-drawer
                v-model="showMenuDrawer"
                direction="ltr"
                :size="drawderSize"
                title="主题设置"
                :with-header="false"
            >
                <sidebar />
            </el-drawer>
            <sidebar v-show="!isMobile" />
        </div>

        <div class="flex-1 flex flex-col min-w-0">
            <div class="app-header">
                <navbar />
            </div>
            <div class="app-main flex-1 min-h-0">
                <app-main />
            </div>
        </div>

        <setting ref="settingRef" />
    </div>
</template>

<script setup lang="ts">
import AppMain from './components/app-main.vue'
import Sidebar from './components/sidebar/index.vue'
import Navbar from './components/navbar.vue'
import Setting from './components/setting.vue'
import useAppStore from '@/stores/modules/app'
import useSettingStore from '@/stores/modules/setting'

const appStore = useAppStore()
const settingStore = useSettingStore()
const isMobile = computed(() => appStore.isMobile)
const showMenuDrawer = computed({
    get() {
        return !appStore.isCollapsed && isMobile.value
    },
    set(value) {
        appStore.toggleSidebar(!value)
    }
})

const drawderSize = computed(() => {
    return `${settingStore.sideWidth + 1}px`
})
</script>
<style lang="scss" scoped>
.app-container {
    .app-aside {
        :deep(.el-drawer__body) {
            padding: 0;
        }
    }
}
</style>

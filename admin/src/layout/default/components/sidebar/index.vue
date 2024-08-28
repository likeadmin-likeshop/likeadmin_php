<template>
    <aside class="sidebar h-full">
        <el-drawer
            v-model="showMenuDrawer"
            direction="ltr"
            :size="drawderSize"
            title="主题设置"
            :with-header="false"
        >
            <side />
        </el-drawer>
        <side v-show="!isMobile" />
    </aside>
</template>

<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
import useSettingStore from '@/stores/modules/setting'

import Side from './side.vue'

const appStore = useAppStore()
const settingStore = useSettingStore()
const isMobile = computed(() => appStore.isMobile)
const showMenuDrawer = computed({
    get() {
        return !appStore.isCollapsed && isMobile.value
    },
    set(value) {
        appStore.toggleCollapsed(!value)
    }
})

const drawderSize = computed(() => {
    return `${settingStore.sideWidth + 1}px`
})
</script>

<style lang="scss" scoped>
.sidebar {
    :deep(.el-drawer__body) {
        padding: 0;
    }
}
</style>

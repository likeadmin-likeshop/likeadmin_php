<template>
    <div class="setting flex cursor-pointer h-full items-center px-2" @click="openSetting">
        <icon :size="16" name="el-icon-Setting" />
        <layout-setting />
    </div>
</template>

<script setup lang="ts">
import useSettingStore from '@/stores/modules/setting'

import LayoutSetting from './drawer.vue'

const settingStore = useSettingStore()

const openSetting = () => {
    settingStore.setSetting({
        key: 'showDrawer',
        value: true
    })
}
</script>

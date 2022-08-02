<template>
    <div class="setting flex">
        <icon class="cursor-pointer" :size="16" name="el-icon-Setting" @click="openSetting" />
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

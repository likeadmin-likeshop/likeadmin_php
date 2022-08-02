<template>
    <div class="fold flex">
        <icon
            class="cursor-pointer"
            :name="`local-icon-${isCollapsed ? 'close' : 'open'}`"
            :size="22"
            @click="toggleCollapsed"
        />
    </div>
</template>

<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
const appStore = useAppStore()
const isCollapsed = computed(() => appStore.isCollapsed)
// 折叠展开菜单
const toggleCollapsed = () => {
    appStore.toggleCollapsed()
}
</script>

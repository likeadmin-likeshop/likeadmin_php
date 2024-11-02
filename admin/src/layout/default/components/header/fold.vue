<template>
    <div class="fold h-full cursor-pointer flex items-center px-2" @click="toggleCollapsed">
        <icon :name="`local-icon-${isCollapsed ? 'expand' : 'collapse'}`" :size="18" />
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

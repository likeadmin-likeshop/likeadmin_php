<template>
    <div class="refresh cursor-pointer h-full flex items-center" @click="refreshView">
        <icon name="el-icon-RefreshRight" :size="18" />
    </div>
</template>

<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
const appStore = useAppStore()
// 刷新页面
const refreshView = () => {
    appStore.refreshView()
}
</script>

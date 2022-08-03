<template>
    <div class="refresh flex">
        <icon class="cursor-pointer" name="el-icon-RefreshRight" :size="20" @click="refreshView" />
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

<template>
    <NuxtLink :to="appStore.getAdminUrl" target="_blank">
        <ElMenuItem :index="menuItem.path">
            <template #title>
                <span>
                    {{ menuItem.name }}
                </span>
            </template>
        </ElMenuItem>
    </NuxtLink>
</template>
<script lang="ts" setup>
import { ElMenuItem } from 'element-plus'
import { useAppStore } from '~~/stores/app'
defineProps({
    menuItem: {
        type: Object,
        default: () => ({})
    }
})
const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>

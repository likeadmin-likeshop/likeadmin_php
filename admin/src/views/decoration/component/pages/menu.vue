<template>
    <el-menu
        :default-active="modelValue"
        class="w-[160px] min-h-[668px] pages-menu"
        @select="handleSelect"
    >
        <el-menu-item v-for="(item, key) in menus" :index="key" :key="item.id">
            <span>{{ item.name }}</span>
        </el-menu-item>
    </el-menu>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
    menus: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    modelValue: {
        type: String,
        default: '1'
    }
})
const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()
const handleSelect = (index: string) => {
    emit('update:modelValue', index)
}
</script>

<style lang="scss" scoped>
.pages-menu {
    :deep(.el-menu-item) {
        border-color: transparent;
        &.is-active {
            border-right-width: 2px;
            border-color: var(--el-color-primary);
            background-color: var(--el-color-primary-light-9);
        }
    }
}
</style>

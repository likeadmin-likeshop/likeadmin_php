<template>
    <ElMenu class="menu" v-bind="$props" :ellipsis="true">
        <div v-for="item in menu" :key="item.path">
            <slot name="item" :item="item">
                <MenuItem :menu-item="item" :route-path="item.path" />
            </slot>
        </div>
    </ElMenu>
</template>

<script lang="ts" setup>
import { ElMenu, menuProps } from 'element-plus'
import { PropType } from 'vue'
import MenuItem from './menu-item.vue'
defineProps({
    menu: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    ...menuProps
})
</script>

<style lang="scss" scoped>
.menu {
    &.el-menu--horizontal {
        --el-menu-item-height: 40px;
        border-bottom: none;
        :deep(.el-menu-item) {
            span {
                border-bottom: 2px solid transparent;
            }
            &.is-active > span {
                border-color: currentColor;
            }
        }
    }
    &.el-menu--vertical:not(.el-menu--collapse) {
        width: 200px;
    }
}
</style>

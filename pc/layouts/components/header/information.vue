<template>
    <ClientOnly>
        <el-dropdown>
            <span class="flex items-center text-white">
                <MenuItem :menu-item="menuItem" :route-path="menuItem.path" />
                <span class="ml-[-10px]">
                    <Icon name="el-icon-ArrowDown" />
                </span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <NuxtLink to="/information/hot">
                        <el-dropdown-item> 热门资讯 </el-dropdown-item>
                    </NuxtLink>
                    <NuxtLink to="/information/new">
                        <el-dropdown-item> 最新资讯 </el-dropdown-item>
                    </NuxtLink>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </ClientOnly>
</template>
<script lang="ts" setup>
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import MenuItem from '../menu/menu-item.vue'
defineProps({
    menuItem: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style lang="scss" scoped></style>

<template>
    <ClientOnly>
        <el-dropdown :max-height="200">
            <span class="flex items-center text-white">
                <MenuItem :menu-item="menuItem" :route-path="menuItem.path" />
                <span class="ml-[-10px]">
                    <Icon name="el-icon-ArrowDown" />
                </span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <NuxtLink
                        :to="{
                            path: '/information/default',
                            query: {
                                cid: item.id,
                                name: item.name
                            }
                        }"
                        v-for="item in data"
                        :key="item.id"
                    >
                        <el-dropdown-item> {{ item.name }} </el-dropdown-item>
                    </NuxtLink>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </ClientOnly>
</template>
<script lang="ts" setup>
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import { getArticleCate } from '~~/api/news'
import MenuItem from '../menu/menu-item.vue'
defineProps({
    menuItem: {
        type: Object,
        default: () => ({})
    }
})

const { data } = useAsyncData(() => getArticleCate())
</script>

<style lang="scss" scoped></style>

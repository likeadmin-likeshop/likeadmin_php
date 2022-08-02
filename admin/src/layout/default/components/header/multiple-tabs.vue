<template>
    <div class="app-tabs pl-3 flex">
        <div class="flex-1 min-w-0">
            <el-tabs
                :model-value="currentTab"
                closable
                @tab-change="handleChange"
                @tab-remove="handleRemove"
            >
                <template v-for="item in tabsState" :key="item.path">
                    <el-tab-pane :label="item.title" :name="item.path"></el-tab-pane>
                </template>
            </el-tabs>
        </div>
        <el-dropdown>
            <span class="flex items-center px-3">
                <icon :size="16" name="el-icon-arrow-down" />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>关闭当前</el-dropdown-item>
                    <el-dropdown-item>关闭其他</el-dropdown-item>
                    <el-dropdown-item>关闭全部</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { useWatchRoute } from '@/hooks/useWatchRoute'
import useTabsStore, { getRouteParams } from '@/stores/modules/multipleTabs'
const router = useRouter()
const tabsStore = useTabsStore()
const { route } = useWatchRoute((route) => {
    tabsStore.addTab(route)
})

const currentTab = computed(() => {
    return route.meta?.activeMenu ?? route.path
})

const tabsState = computed(() => {
    return tabsStore.getTabList
})

const handleChange = (path: any) => {
    const tabItem = tabsStore.tasMap[path]
    router.push(getRouteParams(tabItem))
}

const handleRemove = (path: any) => {
    tabsStore.removeTab(path, router)
}
</script>
<style lang="scss" scoped>
.app-tabs {
    @apply border-t border-br;
    :deep(.el-tabs) {
        .el-tabs {
            &__header {
                margin-bottom: 0;
            }
            &__content {
                display: none;
            }
            &__nav-next,
            &__nav-prev {
                @apply text-xl;
            }

            &__nav-wrap::after {
                height: 0;
            }
            &__item {
                font-weight: normal;
                padding: 0 15px !important;
                box-sizing: border-box;
                &.is-active {
                    background-color: var(--el-color-primary-light-9);
                    &::before {
                        content: '';
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        background-color: var(--el-color-primary);
                        margin-right: 6px;
                        border-radius: 50%;
                        vertical-align: 2px;
                    }
                    &::after {
                        position: absolute;
                        content: '';
                        display: block;
                        top: 0;
                        height: 2px;
                        left: 0;
                        width: 100%;
                        background-color: var(--el-color-primary);
                    }
                }
                .is-icon-close {
                    color: var(--el-text-color-regular);
                    vertical-align: -2px;
                    &:hover {
                        color: var(--color-white);
                        background-color: var(--el-color-danger);
                    }
                }
            }
            &__active-bar {
                display: none;
            }
        }
    }
}
</style>

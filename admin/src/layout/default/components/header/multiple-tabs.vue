<template>
    <div class="app-tabs">
        <el-tabs closable>
            <template v-for="item in tabsState" :key="item.path">
                <el-tab-pane :label="item.meta?.title"></el-tab-pane>
            </template>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { useWatchRoute } from '@/hooks/useWatchRoute'
import useTabsStore from '@/stores/modules/multipleTabs'
const tabsStore = useTabsStore()
useWatchRoute((route) => {
    tabsStore.addTab(route)
})

const tabsState = computed(() => {
    return tabsStore.getTabList
})
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

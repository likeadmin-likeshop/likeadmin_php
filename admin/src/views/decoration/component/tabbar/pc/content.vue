<template>
    <div class="pc-aside absolute top-0 bottom-0 left-0 w-[150px]">
        <ElScrollbar>
            <div class="h-full px-[10px] flex flex-col">
                <div class="mb-auto">
                    <div class="nav">
                        <template v-for="(item, index) in nav" :key="index">
                            <div
                                v-if="item.is_show == '1'"
                                :to="item.link.path"
                                class="nav-item"
                                :class="{
                                    active: index == 0
                                }"
                            >
                                <decoration-img
                                    width="18px"
                                    height="18px"
                                    :src="index == 0 ? item.selected : item.unselected"
                                    fit="cover"
                                >
                                    <template #error>
                                        <span></span>
                                    </template>
                                </decoration-img>

                                <div class="ml-[10px]">{{ item.name }}</div>
                            </div>
                        </template>
                    </div>
                </div>
                <div>
                    <div class="menu">
                        <div class="menu-item" v-for="(item, index) in menu" :key="index">
                            <decoration-img
                                width="16px"
                                height="16px"
                                :src="item.unselected"
                                fit="cover"
                            >
                                <template #error>
                                    <span></span>
                                </template>
                            </decoration-img>

                            <span class="ml-[6px] line-clamp-1">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ElScrollbar>
    </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

import DecorationImg from '../../decoration-img.vue'

defineProps({
    nav: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    menu: {
        type: Array as PropType<any[]>,
        default: () => []
    }
})
</script>
<style lang="scss" scoped>
.pc-aside {
    border: 2px solid var(--el-color-primary);
    :deep(.el-scrollbar__view) {
        height: 100%;
    }
    .nav {
        .nav-item {
            border-radius: 8px;
            display: flex;
            align-items: center;
            height: 40px;
            margin: 10px 0;
            padding: 0 12px;
            &.active {
                color: #fff;
                background: linear-gradient(90deg, #19e8b7 0%, #00abff 100%);
            }
        }
    }

    .menu-item {
        display: flex;
        align-items: center;
        height: 38px;
        line-height: 38px;
        padding: 0 12px;
        border-radius: 8px;
        cursor: pointer;
        margin: 3px 0;
        font-size: 13px;
    }
}
</style>

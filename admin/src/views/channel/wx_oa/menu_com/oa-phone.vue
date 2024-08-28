<script lang="ts" setup>
import useSettingStore from '@/stores/modules/setting'

import { useMenuOa } from './useMenuOa'

// 菜单颜色（这里采用全局颜色）
const settingStore = useSettingStore()
const themeColor = computed(() => settingStore.theme || '#4A5DFF')

const { menuList, menuIndex, handleAddMenu } = useMenuOa(useMenuOa)
</script>

<template>
    <!-- Phone -->
    <div class="oa-phone mr-[35px]">
        <div class="oa-phone-content"></div>

        <div class="flex oa-phone-menu">
            <div class="flex items-center justify-center oa-phone-menu-switch">
                <el-icon>
                    <Grid />
                </el-icon>
            </div>

            <template v-for="(menuItem, i) in menuList" :key="i">
                <div class="relative flex-1" @click="menuIndex = i">
                    <!-- 一级菜单 -->
                    <div
                        class="flex items-center justify-center flex-1 text-sm oa-phone-menu-item"
                        :class="{ 'active-menu': menuIndex === i }"
                    >
                        {{ menuItem.name }}
                    </div>

                    <!-- 二级菜单 -->
                    <div
                        class="oa-phone-menu-subitem"
                        v-show="menuItem.sub_button.length && menuItem.has_menu"
                    >
                        <template v-for="(subItem, index2) in menuItem.sub_button" :key="index2">
                            <div class="oa-phone-menu-subitem-title">
                                {{ subItem.name }}
                            </div>
                        </template>
                    </div>
                </div>
            </template>
            <!-- 新增菜单 -->
            <template v-if="menuList.length <= 2">
                <div class="flex items-center justify-center flex-1 h-full" @click="handleAddMenu">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.oa-phone {
    width: 260px;
    height: 461px;
    border: 1px solid #e5e5ea;
    flex: none;
    &-content {
        height: 420px;
        border-bottom: 1px solid #e5e5ea;
    }

    &-menu {
        height: 40px;
        cursor: pointer;

        &-switch {
            width: 40px;
            height: 100%;
            border-right: 1px solid #e5e5ea;
        }

        // 一级菜单
        &-item {
            height: 100%;
            border-right: 1px solid #e5e5ea;
        }

        &-item:nth-child(4) {
            border-right: none;
        }

        .active-menu {
            position: relative;
        }

        .active-menu::after {
            content: '';
            width: 100%;
            height: 41px;
            top: -1px;
            position: absolute;
            border: 1px solid v-bind(themeColor);
        }

        // 二级菜单
        &-subitem {
            width: 98%;
            left: 2px;
            bottom: calc(100% + 10px);
            position: absolute;
            border: 1px solid #e5e5ea;
            border-top: none;

            &-title {
                height: 40px;
                line-height: 40px;
                text-align: center;
                border-top: 1px solid #e5e5ea;
            }
        }
    }
}
</style>

<template>
    <header class="layout-header text-white bg-primary">
        <div class="header-contain">
            <Menu
                class="flex-1 navbar"
                :menu="menu"
                :default-active="activeMenu"
                mode="horizontal"
            />
            <ElDropdown v-if="userStore.isLogin">
                <div class="flex items-center">
                    <ElAvatar :size="25" :src="userStore.userInfo.avatar" />
                    <div class="ml-1 text-white text-lg flex">
                        <span class="mr-2">个人中心</span>
                        <ElIcon><ArrowDown /></ElIcon>
                    </div>
                </div>
                <template #dropdown>
                    <ElDropdownMenu>
                        <ElDropdownItem>个人信息</ElDropdownItem>
                        <ElDropdownItem>我的收藏</ElDropdownItem>
                        <ElDropdownItem>账号安全</ElDropdownItem>
                        <ElDropdownItem>退出登录</ElDropdownItem>
                    </ElDropdownMenu>
                </template>
            </ElDropdown>

            <div v-else class="cursor-pointer text-lg" @click="handleToLogin">
                登录/注册
            </div>
        </div>
    </header>
</template>
<script lang="ts" setup>
import {
    ElAvatar,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElIcon
} from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { PopupTypeEnum, useAccount } from '../account/useAccount'
import Menu from '../menu/index.vue'
const route = useRoute()
const activeMenu = computed<string>(() => route.path)
const { menu } = useMenu()
const { setPopupType, toggleShowPopup } = useAccount()
const userStore = useUserStore()

const handleToLogin = () => {
    setPopupType(PopupTypeEnum.LOGIN)
    toggleShowPopup(true)
}
</script>

<style lang="scss" scoped>
.layout-header {
    height: var(--header-height);
    border-bottom: 1px solid var(--el-border-color-extra-light);
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1999;
    .header-contain {
        height: 100%;
        display: flex;
        align-items: center;
        max-width: 1920px;
        margin: 0 auto;
        padding: 0 40px;
        .navbar {
            --el-menu-item-font-size: var(--el-font-size-large);
            --el-menu-bg-color: var(--el-color-primary);
            --el-menu-active-color: var(--color-white);
            --el-menu-text-color: var(--color-white);
            --el-menu-item-hover-fill: var(--el-color-primary);
            --el-menu-hover-text-color: var(--color-white);
            --el-menu-hover-bg-color: var(--el-color-primary);
        }
    }
}
</style>

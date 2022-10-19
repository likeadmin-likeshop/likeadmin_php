<template>
    <header class="layout-header text-white bg-primary">
        <div class="header-contain">
            <Menu
                class="flex-1 navbar"
                :menu="menu"
                :default-active="activeMenu"
                background-color="var(--el-color-primary)"
                text-color="var(--color-white)"
                active-text-color="var(--color-white)"
                mode="horizontal"
            />
            <div class="cursor-pointer" @click="handleToLogin">登录/注册</div>
        </div>
    </header>
</template>
<script lang="ts" setup>
import { PopupTypeEnum, useAccount } from '../account/useAccount'
import Menu from '../menu/index.vue'
const route = useRoute()
const activeMenu = computed<string>(() => route.path)
const { menu } = useMenu()
const { setPopupType, toggleShowPopup, showPopup } = useAccount()
const handleToLogin = () => {
    setPopupType(PopupTypeEnum.LOGIN)
    toggleShowPopup(true)
    console.log(showPopup.value)
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
        }
    }
}
</style>

<template>
    <header class="layout-header text-white bg-primary">
        <div class="header-contain">
            <Logo />
            <Menu
                class="flex-1 navbar"
                :menu="menu"
                :default-active="activeMenu"
                mode="horizontal"
            />
            <Search class="mr-[40px]" />
            <User class="flex-none" />
        </div>
    </header>
</template>
<script lang="ts" setup>
import Menu from '../menu/index.vue'
import User from './user.vue'
import Search from './search.vue'
import Logo from './logo.vue'
const route = useRoute()
const activeMenu = computed<string>(() => route.path)
const { menu } = useMenu()
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
        max-width: 1180px;
        margin: 0 auto;
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

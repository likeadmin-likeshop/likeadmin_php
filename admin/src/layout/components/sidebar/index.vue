<template>
    <div
        class="sidebar-wrap h-full flex flex-col"
        :style="sidebarStyle"
        :class="`theme-${sideTheme}`"
    >
        <div class="logo">
            <image-contain width="34" height="34" :src="config.web_logo" />
            <transition name="slide-fade" mode="out-in" :duration="300">
                <div
                    v-show="!isCollapsed"
                    class="ml-11 truncate logo-title text-xl"
                    :class="{ 'text-white': sideTheme == 'dark' }"
                >
                    {{ config.web_name }}
                </div>
            </transition>
        </div>
        <div class="flex-1 min-h-0">
            <el-scrollbar>
                <el-menu
                    v-bind="menuProps"
                    :default-active="activeMenu"
                    :collapse="isCollapsed"
                    mode="vertical"
                    @select="handleSelect"
                >
                    <menu-item
                        v-for="route in sidebar"
                        :key="route.path"
                        :route="route"
                        :route-path="route.path"
                        :popper-class="`theme-${sideTheme}`"
                    />
                </el-menu>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
import MenuItem from './menu-item.vue'
import useUserStore from '@/stores/modules/user'
import useAppStore from '@/stores/modules/app'
import useSettingStore from '@/stores/modules/setting'

const route = useRoute()
const activeMenu = computed<string>(() => (route.meta?.activeMenu as string) ?? route.path)
const userStore = useUserStore()
const sidebar = computed(() => userStore.routes)
const appStore = useAppStore()
const isCollapsed = computed(() => {
    if (appStore.isMobile) {
        return false
    } else {
        return appStore.isCollapsed
    }
})
const config = computed(() => appStore.config)
const settingStore = useSettingStore()
const sideTheme = computed(() => settingStore.sideTheme)
const sidebarStyle = computed(() => {
    return sideTheme.value == 'dark' ? `--side-dark-color:${settingStore.sideDarkColor}` : ''
})
const menuProps = computed(() => {
    return {
        'background-color': sideTheme.value == 'dark' ? settingStore.sideDarkColor : '',
        'text-color': sideTheme.value == 'dark' ? 'var(--el-color-white)' : '',
        'active-text-color': sideTheme.value == 'dark' ? 'var(--el-color-white)' : ''
    }
})

const handleSelect = () => {
    if (appStore.isMobile) {
        appStore.toggleSidebar(true)
    }
}
</script>

<style lang="scss" scoped>
.sidebar-wrap {
    position: relative;
    z-index: 999;
    @apply border-r border-br-light bg-body;
    &.theme-dark {
        background-color: var(--side-dark-color);
        .el-menu {
            :deep(.el-menu-item) {
                &.is-active {
                    @apply bg-primary border-primary;
                }
            }
        }
        :deep(.el-menu--collapse) {
            .el-sub-menu.is-active .el-sub-menu__title {
                @apply bg-primary #{!important};
            }
        }
    }
    &.theme-light {
        :deep(.el-menu) {
            .el-menu-item {
                &.is-active {
                    @apply bg-primary-light-9 border-r-2 border-primary;
                }
            }
        }
    }
    .el-menu {
        border-right: none;
        &:not(.el-menu--collapse) {
            width: var(--aside-width);
        }
    }
    .logo {
        height: var(--header-height);
        @apply flex items-center p-2 relative;
        .logo-title {
            width: 70%;
            position: absolute;
        }
    }
    .slide-fade-enter-active {
        opacity: 0;
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(-20px);
        opacity: 0;
    }
}
</style>

<template>
  <div
    class="sidebar-wrap h-full flex flex-col"
    :style="sidebarStyle"
    :class="`theme-${sideTheme}`"
  >
    <div
      class="logo flex items-center p-4"
      :class="{
        'bg-primary': sideTheme == 'light'
      }"
    >
      <image-contain width="33" height="33" :src="config.web_logo" />
      <transition name="slide-fade" mode="out-in" :duration="300">
        <div v-show="!isCollapse" class="line-1 text-white ml-4">{{ config.web_name }}</div>
      </transition>
    </div>
    <div class="flex-1 min-h-0">
      <el-scrollbar>
        <el-menu
          v-bind="menuProps"
          :default-active="activeMenu"
          :collapse="isCollapse"
          :unique-opened="true"
          mode="vertical"
        >
          <menu-item
            v-for="route in sidebar"
            :key="route.path"
            :route="route"
            :route-path="route.path"
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
const isCollapse = computed(() => appStore.sidebar.opened)
const config = computed(() => appStore.config)
const settingStore = useSettingStore()
const sideTheme = computed(() => settingStore.sideTheme)
const sidebarStyle = computed(() => {
  return sideTheme.value == 'dark' ? `--side-dark-color:${settingStore.sideDarkColor}` : ''
})
const menuProps = computed(() => {
  return {
    'background-color': sideTheme.value == 'dark' ? settingStore.sideDarkColor : '',
    'text-color': sideTheme.value == 'dark' ? 'var(--color-white)' : '',
    'active-text-color': sideTheme.value == 'dark' ? 'var(--el-color-white)' : ''
  }
})
</script>

<style lang="scss" scoped>
.sidebar-wrap {
  &.theme-dark {
    background-color: var(--side-dark-color);
    .el-menu {
      :deep(.el-menu-item) {
        &.is-active {
          @apply bg-primary border-primary;
        }
      }
    }
  }
  &.theme-light {
    .el-menu {
      :deep(.el-menu-item) {
        &.is-active {
          @apply bg-primary-light-9 border-primary;
        }
      }
    }
  }
  .el-menu {
    border-right: none;

    &:not(.el-menu--collapse) {
      width: var(--aside-width);
    }
    :deep(.el-menu-item) {
      border-right: 2px solid transparent;
    }
  }
  .logo {
    height: var(--header-height);
  }
  .slide-fade-enter-active {
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

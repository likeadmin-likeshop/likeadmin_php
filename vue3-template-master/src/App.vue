<script setup lang="ts">
import { useDark } from '@vueuse/core'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { setTheme } from './utils/theme'
import useAppStore from './stores/modules/app'
import useSettingStore from './stores/modules/setting'
const appStore = useAppStore()
const settingStore = useSettingStore()
const elConfig = {
  zIndex: 3000,
  locale: zhCn
}

const isDark = useDark()
//设置主题色

onMounted(async () => {
  setTheme(settingStore.theme, 'primary', isDark.value)
  // 获取配置
  const data: any = await appStore.getConfig()
  // 设置网站logo
  let favicon: HTMLLinkElement = document.querySelector('link[rel="icon"]')!
  if (favicon) {
    favicon.href = data.web_favicon
    return
  }
  favicon = document.createElement('link')
  favicon.rel = 'icon'
  favicon.href = data.web_favicon
  document.head.appendChild(favicon)
})
</script>

<template>
  <el-config-provider :locale="elConfig.locale" :z-index="elConfig.zIndex">
    <router-view />
  </el-config-provider>
</template>

<style></style>

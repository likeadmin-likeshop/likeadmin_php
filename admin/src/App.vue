<template>
    <el-config-provider :locale="elConfig.locale" :z-index="elConfig.zIndex">
        <router-view />
    </el-config-provider>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick, provide, onMounted } from 'vue'
import { useAdmin } from './core/hooks/app'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const { store, route } = useAdmin()

const elConfig = {
    zIndex: 3000,
    locale: zhCn
}
onMounted(async () => {
    // 获取配置
    const data = await store.dispatch('app/getConfig')

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

<style lang="scss">
@import "./assets/font/iconfont.css";
@import "./styles/index.scss";
</style>

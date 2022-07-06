<template>
    <router-view />
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick, provide, onMounted } from 'vue'
import { useAdmin } from './core/hooks/app'
export default defineComponent({
    setup() {
        const { store, route } = useAdmin()
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
    }
})
</script>

<style lang="scss">
@import "./assets/font/iconfont.css";
@import "./styles/index.scss";
</style>

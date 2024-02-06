<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { useAppStore } from './stores/app'
import { useUserStore } from './stores/user'
const appStore = useAppStore()
const { getUser } = useUserStore()

//#ifdef H5
const setH5WebIcon = () => {
    const config = appStore.getWebsiteConfig
    let favicon: HTMLLinkElement = document.querySelector('link[rel="icon"]')!
    if (favicon) {
        favicon.href = config.h5_favicon
        return
    }
    favicon = document.createElement('link')
    favicon.rel = 'icon'
    favicon.href = config.h5_favicon
    document.head.appendChild(favicon)
}
//#endif

onLaunch(async () => {
    await appStore.getConfig()
    //#ifdef H5
    setH5WebIcon()
    //#endif
    // #ifdef H5
    const { status, page_status, page_url } = appStore.getH5Config
    if (status == 0) {
        if (page_status == 1) return (location.href = page_url)
        uni.reLaunch({ url: '/pages/empty/empty' })
    }
    // #endif
    await getUser()
})
</script>
<style lang="scss">
//
</style>

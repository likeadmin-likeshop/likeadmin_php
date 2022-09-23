<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { useAppStore } from './stores/app'
import { useUserStore } from './stores/user'
const appStore = useAppStore()
const { getUser } = useUserStore()

onLaunch(async () => {
    await appStore.getConfig()
    // #ifdef H5
    const { status, close, url } = appStore.getH5Config
    if (status == 0) {
        if (close == 1) return (location.href = url)
        uni.reLaunch({ url: '/pages/empty/empty' })
    }
    // #endif
    await getUser()
})
</script>
<style lang="scss">
//
</style>

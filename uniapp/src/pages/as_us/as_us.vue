<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view class="as-us flex flex-1 flex-col items-center">
        <image :src="appStore.getWebsiteConfig.shop_logo" mode="" class="img"></image>
        <view class="text-content mt-[20rpx]">当前版本{{ appStore.config.version }}</view>
    </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.as-us {
    .img {
        width: 160rpx;
        height: 160rpx;
        border-radius: 20rpx;
        margin-top: 96rpx;
    }
}
</style>

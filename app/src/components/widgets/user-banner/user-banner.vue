<template>
    <view
        class="banner h-[200rpx] mx-[20rpx] mt-[20rpx] translate-y-0"
        v-if="content.data.length && content.enabled"
    >
        <swiper
            class="swiper h-full"
            :indicator-dots="content.data.length > 1"
            indicator-active-color="#4173ff"
            :autoplay="true"
        >
            <swiper-item
                v-for="(item, index) in content.data"
                :key="index"
                @click="handleClick(item.limk)"
            >
                <u-image
                    mode="aspectFit"
                    width="100%"
                    height="100%"
                    :src="getImageUrl(item.image)"
                    :border-radius="14"
                />
            </swiper-item>
        </swiper>
    </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { navigateTo } from '@/utils/util'

const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    },
    styles: {
        type: Object,
        default: () => ({})
    }
})
const handleClick = (link: any) => {
    navigateTo(link)
}
const { getImageUrl } = useAppStore()
</script>

<style></style>

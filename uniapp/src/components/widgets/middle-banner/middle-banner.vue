<template>
    <view
        class="banner h-[200rpx] mx-[20rpx] mt-[20rpx] translate-y-0"
        v-if="showList.length && content.enabled"
    >
        <swiper
            class="swiper h-full"
            :indicator-dots="showList.length > 1"
            indicator-active-color="#4173ff"
            :autoplay="true"
        >
            <swiper-item
                v-for="(item, index) in showList"
                :key="index"
                @click="handleClick(item.link)"
            >
                <u-image
                    mode="widthFix"
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
import { computed } from 'vue'

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

const showList = computed(() => {
    return props.content.data?.filter((item: any) => item.is_show == '1') || []
})
</script>

<style></style>

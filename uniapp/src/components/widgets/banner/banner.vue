<template>
    <view
        class="banner h-[340rpx] bg-white translate-y-0"
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
                    mode="aspectFit"
                    width="100%"
                    height="100%"
                    :src="getImageUrl(item.image)"
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
const { getImageUrl } = useAppStore()
const showList = computed(() => {
    return props.content.data?.filter((item: any) => item.is_show == '1') || []
})
const handleClick = (link: any) => {
    navigateTo(link)
}
</script>

<style></style>

<template>
    <view
        class="banner translate-y-0"
        :class="{ 'px-[20rpx]': !isLargeScreen }"
        v-if="content.data.length && content.enabled"
    >
        <LSwiper
            :content="content"
            :height="isLargeScreen ? '1100' : '321'"
            :circular="true"
            :effect3d="false"
            :border-radius="isLargeScreen ? '0' : '14'"
            interval="7000"
            bgColor="transparent"
            @change="handleChange"
        ></LSwiper>
    </view>
</template>

<script setup lang="ts">
import LSwiper from '@/components/l-swiper/l-swiper.vue'
import {useAppStore} from "@/stores/app";

const emit = defineEmits(['change'])
const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    },
    styles: {
        type: Object,
        default: () => ({})
    },
    isLargeScreen: {
        type: Boolean
    }
})
const {getImageUrl} = useAppStore();

const handleChange = (index: number) => {
    emit('change', getImageUrl(props['content'].data[index].bg))
}
</script>

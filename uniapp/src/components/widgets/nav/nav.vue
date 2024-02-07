<template>
    <view class="nav pt-[30rpx] pb-[16rpx] bg-white" v-if="showList.length && content.enabled">
        <view class="nav-item flex flex-wrap">
            <view
                v-for="(item, index) in showList"
                :key="index"
                class="flex flex-col items-center w-1/5 mb-[30rpx]"
                @click="handleClick(item.link)"
            >
                <u-image width="41px" height="41px" :src="getImageUrl(item.image)" alt="" />
                <view class="mt-[14rpx]">{{ item.name }}</view>
            </view>
        </view>
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
const showList = computed(() => {
    return props.content.data?.filter((item: any) => item.is_show == '1') || []
})
const { getImageUrl } = useAppStore()
</script>

<style></style>

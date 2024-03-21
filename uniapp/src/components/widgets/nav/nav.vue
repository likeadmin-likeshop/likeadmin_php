<template>
    <div class="relative mx-[20rpx] mt-[20rpx]">
        <swiper
            class="py-[20rpx] bg-white rounded-lg"
            :style="{
                height: navList[0].length > content.per_line ? '288rpx' : '132rpx'
            }"
            :autoplay="false"
            :indicator-dots="false"
            @change="swiperChange"
        >
            <swiper-item v-for="(sItem, sIndex) in navList" :key="sIndex">
                <view class="nav" v-if="navList.length && content.enabled">
                    <view
                        class="grid grid-rows-auto gap-y-3 w-full"
                        :style="{ 'grid-template-columns': `repeat(${content.per_line}, 1fr)` }"
                    >
                        <view
                            v-for="(item, index) in sItem"
                            :key="index"
                            class="flex flex-col items-center"
                            @click="handleClick(item.link)"
                        >
                            <u-image width="82" height="82" :src="getImageUrl(item.image)" alt=""/>
                            <view class="mt-[14rpx] text-xs">{{ item.name }}</view>
                        </view>
                    </view>
                </view>
            </swiper-item>
        </swiper>
    </div>
</template>

<script setup lang="ts">
import {ref, watch, computed} from 'vue'
import {useAppStore} from '@/stores/app'
import {navigateTo, sliceArray} from '@/utils/util'

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

const {getImageUrl} = useAppStore()
const swiperCurrent = ref<number>(0)
const navList = ref<Record<string, any>>([])

const pagesNum = computed<number>(() => {
    return props.content.per_line * props.content.show_line
})

watch(
    () => props.content.data,
    (val) => {
        const num = props.content.style === 1 ? val.length : pagesNum.value
        navList.value = sliceArray(val, num)
        console.log(navList.value)
    },
    {deep: true, immediate: true}
)

const handleClick = (link: any) => {
    navigateTo(link)
}

const swiperChange = (e: any) => {
    swiperCurrent.value = e.detail.current
}
</script>
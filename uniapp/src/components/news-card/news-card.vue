<template>
    <navigator :url="`/pages/news_detail/news_detail?id=${newsId}`">
        <view class="news-card flex bg-white px-[20rpx] py-[32rpx]">
            <view class="mr-[20rpx]" v-if="item.image">
                <u-image :src="item.image" width="240" height="180"></u-image>
            </view>
            <view class="news-card-content flex flex-col justify-between flex-1">
                <view class="news-card-content-title text-base">{{ item.title }}</view>
                <view class="news-card-content-intro text-gray-400 text-sm mt-[16rpx]">
                    {{ item.desc }}
                </view>

                <view class="text-muted text-xs w-full flex justify-between mt-[12rpx]">
                    <view>{{ item.create_time }}</view>
                    <view class="flex items-center">
                        <image
                            src="/static/images/icon/icon_visit.png"
                            class="w-[30rpx] h-[30rpx]"
                        ></image>
                        <view class="ml-[10rpx]">{{ item.click }}</view>
                    </view>
                </view>
            </view>
        </view>
    </navigator>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(
    defineProps<{
        item: any
        newsId: number
    }>(),
    {
        item: {},
        newsId: ''
    }
)
</script>

<style lang="scss" scoped>
.news-card {
    border-bottom: 1px solid #f8f8f8;
    &-content {
        &-title {
            -webkit-line-clamp: 2;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
        &-intro {
            -webkit-line-clamp: 1;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
    }
}
</style>

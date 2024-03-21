<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view class="news-detail bg-white">
        <!-- 标题信心 -->
        <view class="news-detail-header py-[20rpx] px-[30rpx]">
            <view class="text-3xl font-medium">{{ newsData.title }}</view>
            <view class="flex mt-[20rpx] text-xs">
                <view class="mr-[40rpx]" v-if="newsData.author">作者: {{ newsData.author }}</view>
                <view class="text-muted mr-[40rpx] flex-1">{{ newsData.create_time }}</view>
                <view class="flex items-center text-muted flex-none">
                    <image
                        src="/static/images/icon/icon_visit.png"
                        class="w-[30rpx] h-[30rpx]"
                    ></image>
                    <view class="ml-[10rpx]">{{ newsData.click }}</view>
                </view>
            </view>
        </view>

        <!-- 咨询内容 -->
        <view class="news-detail-section bg-white p-[24rpx]">
            <!-- 摘要 -->
            <view class="summary p-[20rpx] text-base" v-if="newsData.abstract">
                <text class="font-medium">摘要: </text> {{ newsData.abstract }}
            </view>
            <!-- 内容 -->
            <view class="mt-[20rpx]">
                <u-parse :html="newsData.content"></u-parse>
            </view>
        </view>

        <view class="panel-btn flex items-center px-[34rpx]" @click="handleAddCollect(newsData.id)">
            <u-icon
                :name="newsData.collect ? 'star-fill' : 'star'"
                size="40"
                :color="newsData.collect ? '#F7BA47' : '#333'"
            ></u-icon>
            <text class="ml-[10rpx]">收藏</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getArticleDetail, addCollect, cancelCollect } from '@/api/news'

const newsData = ref<any>({})
let newsId = ''

const getData = async (id) => {
    newsData.value = await getArticleDetail({ id })
}

const handleAddCollect = async (id: number) => {
    try {
        if (newsData.value.collect) {
            await cancelCollect({ id })
            uni.$u.toast('已取消收藏')
        } else {
            await addCollect({ id })
            uni.$u.toast('收藏成功')
        }
        getData(newsId)
    } catch (e) {
        //TODO handle the exception
    }
}

onLoad((options: any) => {
    newsId = options.id
    getData(newsId)
})
</script>

<style lang="scss">
.news-detail {
    height: 100%;

    &-header {
        border-bottom: 2rpx solid #f8f8f8;
    }

    &-section {
        .summary {
            border-radius: 12rpx;
            background-color: #f7f7f7;
        }
    }

    .panel-btn {
        position: fixed;
        right: 30rpx;
        height: 80rpx;
        bottom: 80rpx;
        border-radius: 40rpx;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
    }
}
</style>

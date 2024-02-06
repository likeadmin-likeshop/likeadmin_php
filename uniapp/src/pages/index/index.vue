<template>
    <view class="index">
        <view v-for="(item, index) in state.pages" :key="index">
            <template v-if="item.name == 'search'">
                <w-search :content="item.content" :styles="item.styles" />
            </template>
            <template v-if="item.name == 'banner'">
                <w-banner :content="item.content" :styles="item.styles" />
            </template>
            <template v-if="item.name == 'nav'">
                <w-nav :content="item.content" :styles="item.styles" />
            </template>
        </view>
        <view class="article" v-if="state.article.length">
            <view
                class="flex items-center article-title mx-[20rpx] my-[30rpx] text-2xl font-medium"
            >
                最新资讯
            </view>
            <news-card
                v-for="item in state.article"
                :key="item.id"
                :news-id="item.id"
                :item="item"
            />
        </view>

        <!--  #ifdef MP  -->
        <!--  微信小程序隐私弹窗  -->
        <MpPrivacyPopup></MpPrivacyPopup>
        <!--  #endif  -->

        <tabbar />
    </view>
</template>

<script setup lang="ts">
import { getIndex } from '@/api/shop'
import { reactive } from 'vue'

// #ifdef MP
import MpPrivacyPopup from './component/mp-privacy-popup.vue'
// #endif

const state = reactive<{
    pages: any[]
    article: any[]
}>({
    pages: [],
    article: []
})
const getData = async () => {
    const data = await getIndex()
    state.pages = JSON.parse(data?.page?.data)
    state.article = data.article
}

getData()
</script>

<style lang="scss">
.article-title {
    &::before {
        content: '';
        width: 8rpx;
        height: 34rpx;
        display: block;
        margin-right: 10rpx;
        background: $u-type-primary;
    }
}
</style>

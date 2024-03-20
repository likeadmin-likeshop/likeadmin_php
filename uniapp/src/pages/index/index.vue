<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view class="index" :style="pageStyle">
        <!-- 组件 -->
        <template
            v-for="(item, index) in state.pages"
            :key="index"
        >
            <template v-if="item.name == 'search'">
                <w-search
                    :pageMeta="state.meta"
                    :content="item.content"
                    :styles="item.styles"
                    :percent="percent"
                    :isLargeScreen="isLargeScreen"
                />
            </template>
            <template v-if="item.name == 'banner'">
                <w-banner
                    :content="item.content"
                    :styles="item.styles"
                    :isLargeScreen="isLargeScreen"
                    @change="handleBanner"
                />
            </template>
            <template v-if="item.name == 'nav'">
                <w-nav :content="item.content" :styles="item.styles"/>
            </template>
            <template v-if="item.name == 'middle-banner'">
                <w-middle-banner :content="item.content" :styles="item.styles" />
            </template>
        </template>

        <view class="article" v-if="state.article.length">
            <view
                class="flex items-center article-title mx-[20rpx] my-[30rpx] text-lg font-medium"
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

        <!-- 返回顶部按钮 -->
        <u-back-top
            :scroll-top="scrollTop"
            :top="100"
            :customStyle="{
                backgroundColor: '#FFF',
                color: '#000',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)'
            }"
        >
        </u-back-top>

        <!--  #ifdef MP  -->
        <!--  微信小程序隐私弹窗  -->
        <MpPrivacyPopup></MpPrivacyPopup>
        <!--  #endif  -->

        <tabbar/>
    </view>
</template>

<script setup lang="ts">
import {getIndex} from '@/api/shop'
import {onLoad, onPageScroll} from "@dcloudio/uni-app";
import {computed, reactive, ref} from 'vue'

// #ifdef MP
import MpPrivacyPopup from './component/mp-privacy-popup.vue'
// #endif

const state = reactive<{
    pages: any[]
    meta: any[]
    article: any[]
    bannerImage: string
}>({
    pages: [],
    meta: [],
    article: [],
    bannerImage: ''
})
const scrollTop = ref<number>(0)
const percent = ref<number>(0)

// 是否联动背景图
const isLinkage = computed(() => {
    return state.pages.find((item: any) => item.name === 'banner')?.content.bg_style === 1
})
// 是否大屏banner
const isLargeScreen = computed(() => {
    return state.pages.find((item: any) => item.name === 'banner')?.content.style === 2
})

// 根页面样式
const pageStyle = computed(() => {
    const {bg_type, bg_color, bg_image} = state.meta[0]?.content ?? {}
    if (!isLinkage.value) {
        return bg_type == 1 ?
            {'background-color': bg_color} :
            {'background-image': `url(${bg_image})`}
    }
    else return {'background-image': `url(${state.bannerImage})`}
})

const handleBanner = (url: string) => {
    state.bannerImage = url
}

const getData = async () => {
    const data = await getIndex()
    state.pages = JSON.parse(data?.page?.data)
    state.meta = JSON.parse(data?.page?.meta)
    state.article = data.article
    uni.setNavigationBarTitle({
        title: state.meta[0].content.title
    })
}

onPageScroll((event: any) => {
    scrollTop.value = event.scrollTop
    const top = uni.upx2px(100)
    percent.value = event.scrollTop / top > 1 ? 1 : event.scrollTop / top
})

onLoad(() => { getData() })
</script>

<style lang="scss" scoped>
.index {
    position: relative;
    background-repeat: no-repeat;
    background-size: 100% auto;
    overflow: hidden;
    width: 100%;
    transition: all 1s;
    min-height: calc(100vh - env(safe-area-inset-bottom));
}

.article-title {
    &::before {
        content: '';
        width: 8rpx;
        height: 34rpx;
        display: block;
        margin-right: 10rpx;
        @apply bg-primary;
    }
}
</style>

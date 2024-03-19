<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <!-- #ifndef H5 -->
    <u-sticky
        h5-nav-height="0"
        bg-color="transparent"
    >
        <u-navbar
            :is-back="false"
            :is-fixed="false"
            title="资讯"
            :border-bottom="false"
            :title-bold="true"
            :title-color="$theme.navColor"
            :background="{ background: $theme.navBgColor }"
        >
        </u-navbar>
    </u-sticky>
    <!-- #endif -->
    <view class="news">
        <!-- 搜索 -->
        <navigator class="news-search px-[24rpx] py-[14rpx] bg-white" url="/pages/search/search">
            <u-search placeholder="请输入关键词搜索" disabled :show-action="false"></u-search>
        </navigator>

        <!-- 内容 -->
        <tabs
            :current="current"
            @change="handleChange"
            height="80"
            bar-width="60"
            :barStyle="{ bottom: '0' }"
        >
            <tab v-for="(item, i) in tabList" :key="i" :name="item.name">
                <view class="news-list pt-[20rpx]">
                    <news-list :cid="item.id" :i="i" :index="current"></news-list>
                </view>
            </tab>
        </tabs>
        <tabbar />
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow, onReady } from '@dcloudio/uni-app'
import NewsList from './component/news-list.vue'
import { getArticleCate } from '@/api/news'

const tabList = ref<any>([])
const current = ref<number>(0)

const handleChange = (index: number) => {
    console.log(index)
    current.value = Number(index)
}

const getData = async () => {
    const data = await getArticleCate()
    tabList.value = [{ name: '全部', id: '' }].concat(data)
}

onLoad((options) => {
    getData()
})
</script>

<style lang="scss">
.news {
    &-search {
        margin-bottom: 2rpx;
    }

    &-list {
        height: calc(100vh - 272rpx - env(safe-area-inset-bottom));
    }
}
</style>

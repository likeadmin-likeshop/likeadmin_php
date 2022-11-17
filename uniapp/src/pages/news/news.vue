<template>
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

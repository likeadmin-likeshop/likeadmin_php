<template>
    <view class="suggest bg-white">
        <!-- 热门搜索 -->
        <view class="hot" v-if="hot_search.status == 1 && searchData.length">
            <view class="font-medium pl-[24rpx] pt-[26rpx] pb-[6rpx] text-lg">热门搜索</view>

            <view class="w-full px-[24rpx]">
                <block v-for="(hotItem, index) in searchData" :key="index">
                    <view
                        class="keyword truncate max-w-full"
                        @click="handleHistoreSearch(hotItem.name)"
                    >
                        {{ hotItem.name }}
                    </view>
                </block>
            </view>
        </view>

        <view
            class="mx-[24rpx] my-[40rpx] border-b border-solid border-0 border-light"
            v-if="hot_search.status == 1 && searchData.length && his_search.length"
        ></view>

        <!-- 历史搜索 -->
        <view class="history" v-if="his_search.length">
            <view class="flex justify-between px-[24rpx] pb-[6rpx] pt-[26rpx]">
                <view class="text-lg font-medium">历史搜索</view>
                <view class="text-xs text-muted" @click="() => emit('clear')">清空</view>
            </view>

            <view class="w-full px-[24rpx]">
                <block v-for="(hisItem, index) in his_search" :key="index">
                    <view class="keyword truncate" @click="handleHistoreSearch(hisItem)">{{
                        hisItem
                    }}</view>
                </block>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const emit = defineEmits<{
    (event: 'search', value: string): void
    (event: 'clear', value: void): void
}>()

const props = withDefaults(
    defineProps<{
        hot_search?: {
            data: any[]
            status: number
        }
        his_search?: string[]
    }>(),
    {
        hot_search: () => ({
            data: [],
            status: 0
        }),
        his_search: () => []
    }
)

const searchData = computed(() => {
    return props.hot_search.data.filter((item) => item.name)
})

const handleHistoreSearch = (text: string) => {
    emit('search', text)
}
</script>

<style lang="scss" scoped>
.suggest {
    height: 100%;
    .keyword {
        display: inline-block;
        margin: 24rpx 16rpx 0 0;
        padding: 8rpx 24rpx;
        border-radius: 26rpx;
        background-color: #f4f4f4;
    }
}
</style>

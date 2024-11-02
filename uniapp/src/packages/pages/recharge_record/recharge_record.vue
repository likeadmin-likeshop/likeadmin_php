<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <z-paging
        ref="paging"
        v-model="dataList"
        @query="queryList"
        :show-loading-more-when-reload="true"
    >
        <view class="pt-2.5">
            <view
                v-for="item in dataList"
                :key="item.id"
                class="bg-white border-solid border-b border-0 border-light px-[26rpx] py-[24rpx]"
            >
                <view class="flex justify-between">
                    <view class="mr-2">{{ item.tips }}</view>
                    <view class="text-lg text-primary"> +{{ item.order_amount }} </view>
                </view>
                <view class="text-sm text-muted mr-1">{{ item.create_time }}</view>
            </view>
        </view>
    </z-paging>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import { rechargeRecord } from '@/api/recharge'

const paging = shallowRef()
const dataList = ref<any[]>([])

const queryList = async (pageNo: number, pageSize: number) => {
    try {
        const data = await rechargeRecord({
            page_no: pageNo,
            page_size: pageSize
        })
        paging.value.complete(data.lists)
    } catch (error) {
        paging.value.complete(false)
    }
}
</script>

<style lang="scss" scoped></style>

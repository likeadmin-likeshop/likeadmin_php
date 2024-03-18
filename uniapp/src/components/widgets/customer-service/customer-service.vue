<template>
    <view
        class="customer-service bg-white flex flex-col justify-center items-center mx-[36rpx] mt-[20rpx] rounded-lg px-[110rpx] pt-[100rpx] pb-[160rpx]"
    >
        <u-image width="280" height="280" :src="getImageUrl(content.qrcode)" />
        <view v-if="content.title" class="text-lg mt-[24rpx] font-medium">{{ content.title }}</view>
        <view v-if="content.mobile" class="text-content text-sm mt-[14rpx] flex flex-wrap">
            客服电话：{{ content.mobile }}
            <!-- #ifdef H5 -->
            <a class="ml-[10rpx] phone text-muted underline" :href="'tel:' + content.mobile">
                拨打
            </a>
            <!-- #endif -->
            <!-- #ifndef H5 -->
            <view class="ml-[10rpx] phone text-muted underline" @click="handleCall">拨打</view>
            <!-- #endif -->
        </view>
        <view class="mt-[100rpx] w-full">
            <u-button
                type="primary"
                shape="circle"
                @click="saveImageToPhotosAlbum(getImageUrl(content.qrcode))"
            >
                保存二维码图片
            </u-button>
        </view>
        <view v-if="content.time" class="text-muted text-xs mt-[30rpx]">
            服务时间：{{ content.time }}
        </view>
    </view>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import { saveImageToPhotosAlbum } from '@/utils/file'

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

const { getImageUrl } = useAppStore()

const handleCall = () => {
    uni.makePhoneCall({
        phoneNumber: String(props.content.mobile)
    })
}
</script>

<style lang="scss"></style>

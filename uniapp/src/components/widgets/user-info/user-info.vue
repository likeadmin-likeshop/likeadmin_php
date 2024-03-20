<template>
    <view class="user-info mb-[0rpx]">
        <!-- #ifndef H5 -->
        <u-sticky
            h5-nav-height="0"
            bg-color="transparent"
        >
            <u-navbar
                :is-back="false"
                :is-fixed="false"
                :title="metaData.title"
                :custom-title="metaData.title_type == 2"
                :border-bottom="false"
                :title-bold="true"
                :background="{ background: 'rgba(256,256, 256, 0)' }"
                :title-color="$theme.navColor"
            >
                <template #title>
                    <image
                        class="!h-[54rpx]"
                        :src="metaData.title_img"
                        mode="widthFix"
                    ></image>
                </template>
            </u-navbar>
        </u-sticky>
        <!-- #endif -->
        <view class="flex items-center justify-between px-[50rpx] pb-[50rpx] pt-[40rpx]">
            <view
                v-if="isLogin"
                class="flex items-center"
                @click="navigateTo('/pages/user_data/user_data')"
            >
                <u-avatar :src="user.avatar" :size="120"></u-avatar>
                <view class="text-white ml-[20rpx]">
                    <view class="text-2xl">{{ user.nickname }}</view>
                    <view class="text-xs mt-[18rpx]" @click.stop="copy(user.account)">
                        账号：{{ user.account }}
                    </view>
                </view>
            </view>
            <navigator v-else class="flex items-center" hover-class="none" url="/pages/login/login">
                <u-avatar src="/static/images/user/default_avatar.png" :size="120"></u-avatar>
                <view class="text-white text-3xl ml-[20rpx]">未登录</view>
            </navigator>
            <navigator v-if="isLogin" hover-class="none" url="/pages/user_set/user_set">
                <u-icon name="setting" color="#fff" :size="48"></u-icon>
            </navigator>
        </view>
    </view>
</template>
<script lang="ts" setup>
import { useCopy } from '@/hooks/useCopy'
import {computed} from "vue";

const props = defineProps({
    pageMeta: {
        type: Object,
        default: () => []
    },
    content: {
        type: Object,
        default: () => ({})
    },
    styles: {
        type: Object,
        default: () => ({})
    },
    user: {
        type: Object,
        default: () => ({})
    },
    isLogin: {
        type: Boolean
    }
})
const { copy } = useCopy()

const metaData: any = computed(() => {
    return props.pageMeta[0].content
})

const navigateTo = (url: string) => {
    uni.navigateTo({
        url
    })
}
</script>

<style lang="scss" scoped>
.user-info {
    background: url(../../../static/images/user/my_topbg.png),
        linear-gradient(90deg, $u-type-primary, $u-minor-color);
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100%;
}
</style>

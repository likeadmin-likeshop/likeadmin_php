<template>
    <view class="user-info flex px-[50rpx] justify-between py-[50rpx]">
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
</template>
<script lang="ts" setup>
import { useCopy } from '@/hooks/useCopy'

const props = defineProps({
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
const navigateTo = (url: string) => {
    uni.navigateTo({
        url
    })
}
</script>

<style lang="scss" scoped>
.user-info {
    background: url(/static/images/user/my_topbg.png);
    height: 230rpx;
    background-position: bottom;
    background-size: 100% auto;
}
</style>

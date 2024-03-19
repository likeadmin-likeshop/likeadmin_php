<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view class="user-set">
        <navigator :url="`/pages/user_data/user_data`">
            <view class="item flex bg-white mt-[20rpx]">
                <u-avatar :src="userInfo.avatar" shape="square" :size="100"></u-avatar>
                <view class="ml-[20rpx] flex flex-1 justify-between items-center">
                    <view>
                        <view class="mb-[15rpx] text-xl font-medium">{{ userInfo.nickname }}</view>
                        <view class="text-content text-xs">账号：{{ userInfo.account }}</view>
                    </view>
                    <u-icon name="arrow-right" color="#666"></u-icon>
                </view>
            </view>
        </navigator>
        <view
            class="item bg-white mt-[20rpx] btn-border flex flex-1 justify-between"
            @click="handlePwd"
        >
            <view class="">登录密码</view>
            <u-icon name="arrow-right" color="#666"></u-icon>
        </view>
        <!--  #ifdef H5 || MP-WEIXIN -->
        <view
            v-if="isWeixin"
            class="item bg-white flex flex-1 justify-between"
            @click="bindWechatLock"
        >
            <view class="">绑定微信</view>
            <view class="flex justify-between">
                <view class="text-muted mr-[20rpx]">
                    {{ userInfo.is_auth ? '已绑定' : '未绑定' }}
                </view>
                <u-icon v-if="userInfo.is_auth == 0" name="arrow-right" color="#666"></u-icon>
            </view>
        </view>
        <!-- #endif -->
        <navigator :url="`/pages/agreement/agreement?type=${AgreementEnum.PRIVACY}`">
            <view class="item bg-white mt-[20rpx] btn-border flex flex-1 justify-between">
                <view class="">隐私政策</view>
                <u-icon name="arrow-right" color="#666"></u-icon>
            </view>
        </navigator>
        <navigator :url="`/pages/agreement/agreement?type=${AgreementEnum.SERVICE}`">
            <view class="item bg-white btn-border flex flex-1 justify-between">
                <view class="">服务协议</view>
                <u-icon name="arrow-right" color="#666"></u-icon>
            </view>
        </navigator>
        <navigator url="/pages/as_us/as_us">
            <view class="item bg-white flex flex-1 justify-between">
                <view class="">关于我们</view>
                <view class="flex justify-between">
                    <view class="text-muted mr-[20rpx]">
                        {{ appStore.config.version }}
                    </view>
                    <u-icon name="arrow-right" color="#666"></u-icon>
                </view>
            </view>
        </navigator>

        <view class="mt-[60rpx] mx-[26rpx]">
            <u-button type="primary" shape="circle" @click="showLogout = true"> 退出登录</u-button>
        </view>

        <u-action-sheet
            :list="list"
            v-model="show"
            @click="handleClick"
            :safe-area-inset-bottom="true"
        ></u-action-sheet>

        <u-popup
            class="pay-popup"
            v-model="showLogout"
            round
            mode="center"
            borderRadius="10"
            :maskCloseAble="false"
        >
            <view class="content bg-white w-[560rpx] p-[40rpx]">
                <view class="text-2xl font-medium text-center"> 温馨提示</view>
                <view class="pt-[30rpx] pb-[40rpx]">
                    <view> 是否清除当前登录信息，退出登录？</view>
                </view>
                <view class="flex">
                    <view class="flex-1 mr-[20rpx]">
                        <u-button
                            shape="circle"
                            type="primary"
                            plain
                            size="medium"
                            hover-class="none"
                            :customStyle="{ width: '100%' }"
                            @click="showLogout = false"
                        >
                            取消
                        </u-button>
                    </view>
                    <view class="flex-1">
                        <u-button
                            shape="circle"
                            type="primary"
                            size="medium"
                            hover-class="none"
                            :customStyle="{ width: '100%' }"
                            @click="logoutHandle"
                        >
                            确认
                        </u-button>
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script setup lang="ts">
import {onLoad, onShow} from '@dcloudio/uni-app'
import {computed, ref} from 'vue'
import {useAppStore} from '@/stores/app'
import {useUserStore} from '@/stores/user'
import {AgreementEnum} from '@/enums/agreementEnums'
import {isWeixinClient} from '@/utils/client'
import {mnpAuthBind, oaAuthBind} from '@/api/account'
import {useLockFn} from '@/hooks/useLockFn'
import {useRouter} from "uniapp-router-next";
// #ifdef H5
import wechatOa from '@/utils/wechat'
// #endif

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const list = ref([
    {
        text: '修改密码'
    },
    {
        text: '忘记密码'
    }
])

const isWeixin = ref(true)
// #ifdef H5
isWeixin.value = isWeixinClient()
// #endif

const show = ref(false)
const showLogout = ref(false)

// 修改/忘记密码
const handleClick = (index: number) => {
    switch (index) {
        case 0:
            router.navigateTo('/pages/change_password/change_password')
            break
        case 1:
            router.navigateTo('/pages/forget_pwd/forget_pwd')
            break
    }
}

const handlePwd = () => {
    if (!userInfo.value.has_password)
        return router.navigateTo('/pages/change_password/change_password?type=set')
    show.value = true
}

// 退出登录
const logoutHandle = () => {
    userStore.logout()
    router.redirectTo('/pages/login/login')
}

const bindWechat = async () => {
    if (userInfo.value.is_auth) return
    try {
        uni.showLoading({
            title: '请稍后...'
        })
        // #ifdef MP-WEIXIN
        const {code}: any = await uni.login({
            provider: 'weixin'
        })
        await mnpAuthBind({
            code: code
        })
        //#endif
        // #ifdef H5
        if (isWeixin.value) {
            wechatOa.getUrl()
        }
        // #endif
        await userStore.getUser()
        uni.hideLoading()
    } catch (e) {
        uni.hideLoading()
        uni.$u.toast(e)
    }
}
const {lockFn: bindWechatLock} = useLockFn(bindWechat)

onShow(() => {
    userStore.getUser()
})

onLoad(async (options) => {
    // #ifdef H5
    const {code} = options
    if (!isWeixin.value) return
    if (code) {
        uni.showLoading({
            title: '请稍后...'
        })
        try {
            await oaAuthBind({code})
            await userStore.getUser()
        } catch (error) {
        }
        //用于清空code
        router.redirectTo('/pages/user_set/user_set')
    }

    // #endif
})
</script>

<style lang="scss" scoped>
.user-set {
    .item {
        padding: 30rpx;
    }

    .btn-border {
        border-bottom: 2rpx solid #f8f8f8;
    }
}
</style>

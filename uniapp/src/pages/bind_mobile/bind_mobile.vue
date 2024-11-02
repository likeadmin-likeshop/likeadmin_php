<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view class="bg-white min-h-full flex flex-col items-center px-[40rpx] pt-[40rpx] box-border">
        <view class="w-full">
            <view class="text-2xl font-medium mb-[60rpx]">绑定手机号</view>
            <view
                class="px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex"
            >
                <u-input
                    class="flex-1"
                    v-model="formData.mobile"
                    :border="false"
                    placeholder="请输入手机号码"
                />
            </view>
            <view
                class="px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex mt-[40rpx]"
            >
                <u-input
                    class="flex-1"
                    v-model="formData.code"
                    placeholder="请输入验证码"
                    :border="false"
                />

                <view
                    class="border-l border-solid border-0 border-light pl-3 leading-4 ml-3 w-[180rpx]"
                    @click="sendSms"
                >
                    <u-verification-code
                        ref="uCodeRef"
                        :seconds="60"
                        @change="codeChange"
                        change-text="x秒"
                    />
                    <text :class="formData.mobile ? 'text-primary' : 'text-muted'">
                        {{ codeTips }}
                    </text>
                </view>
            </view>
            <view class="mt-[40rpx]">
                <u-button
                    type="primary"
                    hover-class="none"
                    :customStyle="{
                        height: '100rpx',
                        opacity:
                            formData.mobile && formData.code
                                ? '1'
                                : '0.5'
                    }"
                    @click="handleConfirm"
                >
                    确定
                </u-button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { userBindMobile } from '@/api/user'
import { smsSend } from '@/api/app'
import { SMSEnum } from '@/enums/appEnums'
import { reactive, ref, shallowRef } from 'vue'
import { useUserStore } from '@/stores/user'
const uCodeRef = shallowRef()
const codeTips = ref('')

const userStore = useUserStore()
const codeChange = (text: string) => {
    codeTips.value = text
}

const formData = reactive({
    type: 'bind',
    mobile: '',
    code: ''
})
const sendSms = async () => {
    if (!formData.mobile) return uni.$u.toast('请输入手机号码')
    if (uCodeRef.value?.canGetCode) {
        await smsSend({
            scene: SMSEnum.BIND_MOBILE,
            mobile: formData.mobile
        })
        uni.$u.toast('发送成功')
        uCodeRef.value?.start()
    }
}
const handleConfirm = async () => {
    if (!formData.mobile) return uni.$u.toast('请输入手机号码')
    if (!formData.code) return uni.$u.toast('请输入验证码')
    await userBindMobile(formData, { token: userStore.temToken })
    uni.$u.toast('绑定成功')
    userStore.login(userStore.temToken!)
    uni.navigateBack()
}
</script>

<style lang="scss">
page {
    height: 100%;
}
</style>

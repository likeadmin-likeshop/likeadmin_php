<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view
        class="register bg-white min-h-full flex flex-col items-center px-[40rpx] pt-[100rpx] box-border"
    >
        <view class="w-full">
            <view class="text-2xl font-medium mb-[60rpx]">忘记登录密码</view>
            <u-form borderBottom :label-width="150">
                <u-form-item label="手机号" borderBottom>
                    <u-input
                        class="flex-1"
                        v-model="formData.mobile"
                        :border="false"
                        placeholder="请输入手机号码"
                    />
                </u-form-item>
                <u-form-item label="验证码" borderBottom>
                    <u-input
                        class="flex-1"
                        v-model="formData.code"
                        placeholder="请输入验证码"
                        :border="false"
                    />
                    <view
                        class="border-l border-solid border-0 border-light pl-3 text-muted leading-4 ml-3 w-[180rpx]"
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
                </u-form-item>
                <u-form-item label="新密码" borderBottom>
                    <u-input
                        class="flex-1"
                        type="password"
                        v-model="formData.password"
                        placeholder="6-20位数字+字母或符号组合"
                        :border="false"
                    />
                </u-form-item>
                <u-form-item label="确认密码" borderBottom>
                    <u-input
                        class="flex-1"
                        type="password"
                        v-model="formData.password_confirm"
                        placeholder="再次输入新密码"
                        :border="false"
                    />
                </u-form-item>
            </u-form>
            <view class="mt-[100rpx]">
                <u-button type="primary" shape="circle" @click="handleConfirm"> 确定 </u-button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { smsSend } from '@/api/app'
import { forgotPassword } from '@/api/user'
import { SMSEnum } from '@/enums/appEnums'
import { reactive, ref, shallowRef } from 'vue'

const uCodeRef = shallowRef()
const codeTips = ref('')
const formData = reactive({
    mobile: '',
    code: '',
    password: '',
    password_confirm: ''
})

const codeChange = (text: string) => {
    codeTips.value = text
}

const sendSms = async () => {
    if (!formData.mobile) return
    if (uCodeRef.value?.canGetCode) {
        await smsSend({
            scene: SMSEnum.FIND_PASSWORD,
            mobile: formData.mobile
        })
        uni.$u.toast('发送成功')
        uCodeRef.value?.start()
    }
}

const handleConfirm = async () => {
    if (!formData.mobile) return uni.$u.toast('请输入手机号码')
    if (!formData.password) return uni.$u.toast('请输入密码')
    if (!formData.password_confirm) return uni.$u.toast('请输入确认密码')
    if (formData.password != formData.password_confirm) return uni.$u.toast('两次输入的密码不一致')
    await forgotPassword(formData)
    setTimeout(() => {
        uni.navigateBack()
    }, 1500)
}
</script>

<style lang="scss">
page {
    height: 100%;
}
</style>

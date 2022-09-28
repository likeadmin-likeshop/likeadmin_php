<template>
    <view class="bg-white min-h-full flex flex-col items-center px-[40rpx] pt-[40rpx] box-border">
        <view class="w-full">
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
                        {{ codeTips }}
                    </view>
                </u-form-item>
            </u-form>
            <view class="mt-[40rpx]">
                <u-button type="primary" shape="circle" @click="handleConfirm"> 确定 </u-button>
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

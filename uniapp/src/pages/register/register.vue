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
        class="register bg-white min-h-full flex flex-col items-center px-[40rpx] pt-[40rpx] box-border"
    >
        <view class="w-full">
            <view class="text-2xl font-medium mb-[60rpx]">注册新账号</view>

            <view
                class="px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex"
            >
                <u-input
                    class="flex-1"
                    v-model="formData.account"
                    :border="false"
                    placeholder="请输入账号"
                />
            </view>

            <view
                class="px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex mt-[40rpx]"
            >
                <u-input
                    class="flex-1"
                    type="password"
                    v-model="formData.password"
                    placeholder="请输入密码"
                    :border="false"
                />
            </view>
            <view
                class="px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex mt-[40rpx]"
            >
                <u-input
                    class="flex-1"
                    type="password"
                    v-model="formData.password_confirm"
                    placeholder="请再次输入密码"
                    :border="false"
                />
            </view>
            <view class="mt-[40rpx]" v-if="isOpenAgreement">
                <u-checkbox v-model="isCheckAgreement" shape="circle">
                    <view class="text-xs flex">
                        已阅读并同意
                        <view @click.stop>
                            <router-navigate
                                class="text-primary"
                                hover-class="none"
                                to="/pages/agreement/agreement?type=service"
                            >
                                《服务协议》
                            </router-navigate>
                        </view>

                        和
                        <view @click.stop>
                            <router-navigate
                                class="text-primary"
                                hover-class="none"
                                to="/pages/agreement/agreement?type=privacy"
                            >
                                《隐私协议》
                            </router-navigate>
                        </view>
                    </view>
                </u-checkbox>
            </view>
            <view class="mt-[60rpx]">
                <u-button
                    type="primary"
                    hover-class="none"
                    @click="accountRegister"
                    :customStyle="{
                        height: '100rpx',
                        opacity:
                            formData.account && formData.password && formData.password_confirm
                                ? '1'
                                : '0.5'
                    }"
                >
                    注册
                </u-button>
            </view>
        </view>
    </view>
    <!-- 协议弹框 -->
    <u-modal
        v-model="showModel"
        show-cancel-button
        :show-title="false"
        @confirm=";(isCheckAgreement = true), (showModel = false)"
        @cancel="showModel = false"
        confirm-color="var(--color-primary)"
    >
        <view class="text-center px-[70rpx] py-[60rpx]">
            <view> 请先阅读并同意</view>
            <view class="flex justify-center">
                <router-navigate data-theme="" to="/pages/agreement/agreement?type=service">
                    <view class="text-primary">《服务协议》</view>
                </router-navigate>
                和
                <router-navigate to="/pages/agreement/agreement?type=privacy">
                    <view class="text-primary">《隐私协议》</view>
                </router-navigate>
            </view>
        </view>
    </u-modal>
</template>

<script setup lang="ts">
import {register} from '@/api/account'
import {useAppStore} from '@/stores/app'
import {computed, reactive, ref} from 'vue'

const isCheckAgreement = ref(false)
const appStore = useAppStore()
const isOpenAgreement = computed(() => appStore.getLoginConfig.login_agreement == 1)
const formData = reactive({
    account: '',
    password: '',
    password_confirm: ''
})
const showModel = ref(false)
const accountRegister = async () => {
    if (!formData.account) return uni.$u.toast('请输入账号')
    if (!formData.password) return uni.$u.toast('请输入密码')
    if (!formData.password_confirm) return uni.$u.toast('请输入确认密码')
    if (!isCheckAgreement.value && isOpenAgreement.value) return (showModel.value = true)
    if (formData.password != formData.password_confirm) return uni.$u.toast('两次输入的密码不一致')
    await register(formData)
    uni.navigateBack()
}
</script>

<style lang="scss">
page {
    height: 100%;
}
</style>

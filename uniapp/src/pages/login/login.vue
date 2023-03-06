<template>
    <view
        class="bg-white login min-h-full flex flex-col items-center px-[40rpx] pt-[80rpx] box-border"
    >
        <view>
            <u-image
                :src="appStore.getWebsiteConfig.shop_logo"
                mode="widthFix"
                height="160"
                width="160"
            />
        </view>
        <view class="mt-4 text-xl font-medium">{{ appStore.getWebsiteConfig.shop_name }}</view>
        <view class="w-full mt-[60rpx] pb-[60rpx]">
            <u-form borderBottom>
                <template
                    v-if="
                        formData.scene == LoginWayEnum.ACCOUNT &&
                        includeLoginWay(LoginWayEnum.ACCOUNT)
                    "
                >
                    <u-form-item borderBottom>
                        <u-icon class="mr-2" :size="36" name="/static/images/icon/icon_user.png" />
                        <u-input
                            class="flex-1"
                            v-model="formData.account"
                            :border="false"
                            placeholder="请输入账号/手机号码"
                        />
                    </u-form-item>
                    <u-form-item borderBottom>
                        <u-icon
                            class="mr-2"
                            :size="36"
                            name="/static/images/icon/icon_password.png"
                        />
                        <u-input
                            class="flex-1"
                            v-model="formData.password"
                            type="password"
                            placeholder="请输入密码"
                            :border="false"
                        />
                        <navigator url="/pages/forget_pwd/forget_pwd" hover-class="none">
                            <view
                                class="border-l border-solid border-0 border-light pl-3 text-muted leading-4 ml-3"
                            >
                                忘记密码？
                            </view>
                        </navigator>
                    </u-form-item>
                </template>
                <template
                    v-if="
                        formData.scene == LoginWayEnum.MOBILE &&
                        includeLoginWay(LoginWayEnum.MOBILE)
                    "
                >
                    <u-form-item borderBottom>
                        <u-icon
                            class="mr-2"
                            :size="36"
                            name="/static/images/icon/icon_mobile.png"
                        />
                        <u-input
                            class="flex-1"
                            v-model="formData.account"
                            :border="false"
                            placeholder="请输入手机号码"
                        />
                    </u-form-item>
                    <u-form-item borderBottom>
                        <u-icon class="mr-2" :size="36" name="/static/images/icon/icon_code.png" />
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
                            <text :class="formData.account ? 'text-primary' : 'text-muted'">
                                {{ codeTips }}
                            </text>
                        </view>
                    </u-form-item>
                </template>
            </u-form>
            <view class="mt-[40rpx]" v-if="isOpenAgreement">
                <u-checkbox v-model="isCheckAgreement" shape="circle">
                    <view class="text-xs flex">
                        已阅读并同意
                        <view @click.stop>
                            <navigator
                                class="text-primary"
                                hover-class="none"
                                url="/pages/agreement/agreement?type=service"
                            >
                                《服务协议》
                            </navigator>
                        </view>

                        和
                        <view @click.stop>
                            <navigator
                                class="text-primary"
                                hover-class="none"
                                url="/pages/agreement/agreement?type=privacy"
                            >
                                《隐私协议》
                            </navigator>
                        </view>
                    </view>
                </u-checkbox>
            </view>
            <view class="mt-[60rpx]">
                <u-button type="primary" shape="circle" @click="handleLogin(formData.scene)">
                    登 录
                </u-button>
            </view>

            <view class="text-content flex justify-between mt-[40rpx]">
                <view class="flex-1">
                    <view
                        v-if="
                            formData.scene == LoginWayEnum.MOBILE &&
                            includeLoginWay(LoginWayEnum.ACCOUNT)
                        "
                        @click="changeLoginWay(LoginWayEnum.ACCOUNT)"
                    >
                        账号密码登录
                    </view>
                    <view
                        v-if="
                            formData.scene == LoginWayEnum.ACCOUNT &&
                            includeLoginWay(LoginWayEnum.MOBILE)
                        "
                        @click="changeLoginWay(LoginWayEnum.MOBILE)"
                    >
                        短信验证码登录
                    </view>
                </view>

                <navigator url="/pages/register/register" hover-class="none">注册账号</navigator>
            </view>
            <!-- #ifdef MP-WEIXIN || H5 -->
            <view class="mt-[80rpx]" v-if="isOpenOtherAuth && isWeixin">
                <u-divider>第三方登录</u-divider>
                <div class="flex justify-center mt-[40rpx]">
                    <div
                        v-if="inWxAuth && isWeixin"
                        class="flex flex-col items-center"
                        @click="wxLogin"
                    >
                        <img src="@/static/images/icon/icon_wx.png" class="w-[80rpx] h-[80rpx]" />
                        <div class="text-sm mt-[10px]">微信登录</div>
                    </div>
                </div>
            </view>
            <!-- #endif -->
        </view>
        <mplogin-popup
            v-model:show="showLoginPopup"
            :logo="websiteConfig.shop_logo"
            :title="websiteConfig.shop_name"
            @update="handleUpdateUser"
        />
    </view>
</template>

<script setup lang="ts">
import { login, mnpLogin, updateUser } from '@/api/account'
import { smsSend } from '@/api/app'
import { SMSEnum } from '@/enums/appEnums'
import { BACK_URL } from '@/enums/constantEnums'
import { useLockFn } from '@/hooks/useLockFn'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import cache from '@/utils/cache'
import { isWeixinClient } from '@/utils/client'
// #ifdef H5
import wechatOa from '@/utils/wechat'
// #endif
import { onLoad, onShow } from '@dcloudio/uni-app'
import { computed, reactive, ref, shallowRef, watch } from 'vue'

enum LoginWayEnum {
    ACCOUNT = 1,
    MOBILE = 2
}

const isWeixin = ref(true)
// #ifdef H5
isWeixin.value = isWeixinClient()
// #endif

const userStore = useUserStore()
const appStore = useAppStore()

const uCodeRef = shallowRef()
const codeTips = ref('')
const showLoginPopup = ref(false)
const isCheckAgreement = ref(false)

const formData = reactive({
    scene: 1,
    account: '',
    password: '',
    code: ''
})

const loginData = ref()
const codeChange = (text: string) => {
    codeTips.value = text
}

const websiteConfig = computed(() => appStore.getWebsiteConfig)

const sendSms = async () => {
    if (!formData.account) return
    if (uCodeRef.value?.canGetCode) {
        await smsSend({
            scene: SMSEnum.LOGIN,
            mobile: formData.account
        })
        uni.$u.toast('发送成功')
        uCodeRef.value?.start()
    }
}

const changeLoginWay = (way: LoginWayEnum) => {
    formData.scene = way
}

const includeLoginWay = (way: LoginWayEnum) => {
    return appStore.getLoginConfig.login_way?.includes(String(way))
}

const inWxAuth = computed(() => {
    return appStore.getLoginConfig.wechat_auth
})

const isOpenAgreement = computed(() => appStore.getLoginConfig.login_agreement == 1)

const isOpenOtherAuth = computed(() => appStore.getLoginConfig.third_auth == 1)
const isForceBindMobile = computed(() => appStore.getLoginConfig.coerce_mobile == 1)

const loginFun = async () => {
    if (!isCheckAgreement.value && isOpenAgreement.value)
        return uni.$u.toast('请勾选已阅读并同意《服务协议》和《隐私协议》')
    if (formData.scene == LoginWayEnum.ACCOUNT) {
        if (!formData.account) return uni.$u.toast('请输入账号/手机号码')
        if (!formData.password) return uni.$u.toast('请输入密码')
    }
    if (formData.scene == LoginWayEnum.MOBILE) {
        if (!formData.account) return uni.$u.toast('请输入手机号码')
        if (!formData.code) return uni.$u.toast('请输入验证码')
    }
    uni.showLoading({
        title: '请稍后...'
    })
    try {
        const data = await login(formData)
        loginHandle(data)
    } catch (error: any) {
        uni.hideLoading()
        uni.$u.toast(error)
    }
}

const loginHandle = async (data: any) => {
    const { token, mobile } = data
    if (!mobile && isForceBindMobile.value) {
        userStore.temToken = token
        uni.navigateTo({
            url: '/pages/bind_mobile/bind_mobile'
        })
        uni.hideLoading()
        return
    }
    userStore.login(data.token)
    await userStore.getUser()
    uni.$u.toast('登录成功')
    uni.hideLoading()
    const pages = getCurrentPages()
    if (pages.length > 1) {
        const prevPage = pages[pages.length - 2]
        uni.navigateBack({
            success: () => {
                // @ts-ignore
                const { onLoad, options } = prevPage
                // 刷新上一个页面
                onLoad && onLoad(options)
            }
        })
    } else if (cache.get(BACK_URL)) {
        uni.redirectTo({ url: cache.get(BACK_URL) })
    } else {
        uni.reLaunch({
            url: '/pages/index/index'
        })
    }
    cache.remove(BACK_URL)
}

const { lockFn: handleLogin } = useLockFn(loginFun)

const wxLogin = async () => {
    if (!isCheckAgreement.value && isOpenAgreement.value)
        return uni.$u.toast('请勾选已阅读并同意《服务协议》和《隐私协议》')
    // #ifdef MP-WEIXIN

    uni.showLoading({
        title: '请稍后...'
    })
    try {
        const { code }: any = await uni.login({
            provider: 'weixin'
        })
        const data = await mnpLogin({
            code: code
        })
        loginData.value = data
        if (data.is_new_user) {
            uni.hideLoading()
            userStore.temToken = data.token
            showLoginPopup.value = true
            return
        }
        loginHandle(data)
    } catch (error: any) {
        uni.hideLoading()
        uni.$u.toast(error)
    }
    // #endif
    // #ifdef H5
    if (isWeixin.value) {
        wechatOa.getUrl()
    }
    // #endif
}
const handleUpdateUser = async (value: any) => {
    await updateUser(value, { token: userStore.temToken })
    showLoginPopup.value = false
    loginHandle(loginData.value)
}

watch(
    () => appStore.getLoginConfig,
    (value) => {
        if (value.login_way) {
            formData.scene = value.login_way[0]
        }
    },
    {
        immediate: true
    }
)

onShow(async () => {
    try {
        if (userStore.isLogin) {
            uni.showLoading({
                title: '请稍后...'
            })
            await userStore.getUser()
            uni.hideLoading()
            uni.navigateBack()
        }
    } catch (error: any) {
        uni.hideLoading()
    }
})

onLoad(async (options) => {
    if (userStore.isLogin) {
        // 已经登录 => 首页
        uni.reLaunch({
            url: '/pages/index/index'
        })
        return
    }
    // #ifdef H5
    const { code } = options
    if (code) {
        uni.showLoading({
            title: '请稍后...'
        })

        try {
            const data = await wechatOa.authLogin(code)
            loginHandle(data)
        } catch (error: any) {
            uni.hideLoading()
            //用于清空code
            uni.redirectTo({
                url: '/pages/login/login'
            })
            throw new Error(error)
        }
    }
    // #endif
})
</script>

<style lang="scss">
page {
    height: 100%;
}
</style>

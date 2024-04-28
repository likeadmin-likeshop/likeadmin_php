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
        class="bg-white login min-h-full flex flex-col items-center px-[40rpx] pt-[120rpx] box-border"
    >
        <view>
            <image
                :src="appStore.getWebsiteConfig.shop_logo"
                mode="widthFix"
                class="w-[160rpx] h-[160rpx] rounded-full"
            />
        </view>
        <view class="w-full mt-[140rpx] pb-[60rpx]">
            <!-- #ifdef MP-WEIXIN || H5 -->
            <block v-if="!phoneLogin">
                <view v-if="isOpenOtherAuth && isWeixin && inWxAuth">
                    <u-button
                        type="primary"
                        @click="wxLogin"
                        :customStyle="{ height: '100rpx' }"
                        hover-class="none"
                    >
                        用户一键登录
                    </u-button>
                </view>
                <!-- #endif -->

                <view class="mt-[40rpx]">
                    <u-button
                        @click="phoneLogin = !phoneLogin"
                        :customStyle="{ height: '100rpx' }"
                        hover-class="none"
                    >
                        手机号登录
                    </u-button>
                </view>
            </block>
            <block v-if="phoneLogin">
                <!-- 密码登录 -->
                <template
                    v-if="
                        formData.scene == LoginWayEnum.ACCOUNT &&
                        includeLoginWay(LoginWayEnum.ACCOUNT)
                    "
                >
                    <view
                        class="px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex"
                    >
                        <u-input
                            class="flex-1"
                            v-model="formData.account"
                            :border="false"
                            placeholder="输入账号"
                        />
                    </view>
                    <view
                        class="px-[18rpx] py-[10rpx] border border-solid border-light rounded-[10rpx] flex h-[100rpx] items-center mt-[40rpx]"
                    >
                        <u-input
                            class="flex-1"
                            v-model="formData.password"
                            type="password"
                            placeholder="输入密码"
                            :border="false"
                        />
                        <navigator url="/pages/forget_pwd/forget_pwd" hover-class="none">
                            <view
                                class="border-l border-solid border-0 border-light pl-3 text-muted leading-4 ml-3"
                            >
                                忘记密码？
                            </view>
                        </navigator>
                    </view>
                </template>
                <!-- 验证码登录 -->
                <template
                    v-if="
                        formData.scene == LoginWayEnum.MOBILE &&
                        includeLoginWay(LoginWayEnum.MOBILE)
                    "
                >
                    <view
                        class="px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex"
                    >
                        <u-input
                            class="flex-1"
                            v-model="formData.account"
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
                            <text :class="formData.account ? 'text-primary' : 'text-muted'">
                                {{ codeTips }}
                            </text>
                        </view>
                    </view>
                </template>
            </block>

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
            <block v-if="phoneLogin">
                <view class="mt-[60rpx]">
                    <u-button
                        type="primary"
                        @click="handleLogin(formData.scene)"
                        :customStyle="{
                            height: '100rpx',
                            opacity: DisableStyle ? '1' : '0.5'
                        }"
                        hover-class="none"
                    >
                        登录
                    </u-button>
                </view>
                <view class="flex justify-between mt-[40rpx]">
                    <view
                    >已有账号，使用
                        <span
                            class="text-primary"
                            @click="changeLoginWay(LoginWayEnum.ACCOUNT)"
                            v-if="
                                formData.scene == LoginWayEnum.MOBILE &&
                                includeLoginWay(LoginWayEnum.ACCOUNT)
                            "
                        >密码登录</span
                        >
                        <span
                            class="text-primary"
                            @click="changeLoginWay(LoginWayEnum.MOBILE)"
                            v-if="
                                formData.scene == LoginWayEnum.ACCOUNT &&
                                includeLoginWay(LoginWayEnum.MOBILE)
                            "
                        >验证码登录</span
                        >
                    </view>
                    <navigator url="/pages/register/register" hover-class="none"
                    >注册账号</navigator
                    >
                </view>
            </block>
        </view>
        <!-- 协议弹框 -->
        <u-modal
            v-model="showModel"
            show-cancel-button
            :show-title="false"
            confirm-color="var(--color-primary)"
            @confirm=";(isCheckAgreement = true), (showModel = false)"
            @cancel="showModel = false"
        >
            <view class="text-center px-[70rpx] py-[60rpx]">
                <view> 请先阅读并同意 </view>
                <view class="flex justify-center">
                    <navigator data-theme="" url="/pages/agreement/agreement?type=service">
                        <view class="text-primary">《服务协议》</view>
                    </navigator>
                    和
                    <navigator url="/pages/agreement/agreement?type=privacy">
                        <view class="text-primary">《隐私协议》</view>
                    </navigator>
                </view>
            </view>
        </u-modal>
        <!-- #ifdef MP-WEIXIN -->

        <mplogin-popup
            v-model:show="showLoginPopup"
            :logo="websiteConfig.shop_logo"
            :title="websiteConfig.shop_name"
            @update="handleUpdateUser"
        />
        <!--  #endif -->
    </view>
</template>

<script setup lang="ts">
import { login, mnpLogin, updateUser, OALogin } from '@/api/account'
import { smsSend } from '@/api/app'
import { SMSEnum } from '@/enums/appEnums'
import { BACK_URL } from '@/enums/constantEnums'
import { useLockFn } from '@/hooks/useLockFn'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'uniapp-router-next'
import cache from '@/utils/cache'
import { isWeixinClient } from '@/utils/client'
// #ifdef H5
import wechatOa, { UrlScene } from '@/utils/wechat'
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

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()
const showModel = ref(false)
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
const phoneLogin = ref(false)
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
    if (!isCheckAgreement.value && isOpenAgreement.value) return (showModel.value = true)
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
        router.navigateTo('/pages/bind_mobile/bind_mobile')
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
        await router.navigateBack()
        // @ts-ignore
        const { onLoad, options } = prevPage
        // 刷新上一个页面
        onLoad && onLoad(options)
    } else if (cache.get(BACK_URL)) {
        try {
            router.redirectTo(cache.get(BACK_URL))
        } catch (error) {
            router.switchTab(cache.get(BACK_URL))
        }
    } else {
        router.reLaunch('/pages/index/index')
    }
    cache.remove(BACK_URL)
}

const { lockFn: handleLogin } = useLockFn(loginFun)

const oaLogin = async (options: any = { getUrl: true }) => {
    const { code, getUrl } = options
    if (getUrl) {
        await wechatOa.getUrl(UrlScene.LOGIN)
    } else {
        const data = await OALogin({
            code
        })
        return data
    }
    return Promise.reject()
}

const wxLogin = async () => {
    if (!isCheckAgreement.value && isOpenAgreement.value) {
        showModel.value = true
        console.log(showModel.value)
        return
    }

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
        oaLogin()
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
const DisableStyle = computed(() => {
    if (formData.scene == 1 && formData.account && formData.password) {
        return true
    } else if (formData.scene == 2 && formData.account && formData.code) {
        return true
    } else {
        return false
    }
})

const removeWxQuery = () => {
    const options = route.query
    if (options.code && options.state) {
        delete options.code
        delete options.state
        router.redirectTo({ path: route.path, query: options })
    }
}

onLoad(async () => {
    //#ifdef H5
    const options = wechatOa.getAuthData()
    try {
        if (options.code && options.scene === UrlScene.LOGIN) {
            uni.showLoading({
                title: '请稍后...'
            })
            const data = await oaLogin(options)
            if (data) {
                loginData.value = data

                loginHandle(loginData.value)
            }
        }
    } catch (error) {
        removeWxQuery()
    } finally {
        uni.hideLoading()
        //清除保存的授权数据
        wechatOa.setAuthData()
    }
    //#endif
})
</script>

<style lang="scss">
page {
    height: 100%;
}
</style>

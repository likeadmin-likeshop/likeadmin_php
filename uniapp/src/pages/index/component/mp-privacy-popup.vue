<template>
    <!-- modal:隐私授权弹窗-->
    <view v-if="show" class="modal-box" @tap.stop>
        <view class="dialog" @tap.stop>
            <view class="title">隐私政策提示</view>
            <view class="content">
                欢迎使用{{
                    appStore.getWebsiteConfig.shop_name
                }}小程序，请您在使用前点击
                <text
                    class="text-[#243245]"
                    hover-class="hover"
                    @click="openContract"
                >
                    {{ name }}
                </text>
                并仔细阅读，如您同意全部内容，请点击同意开始使用我们的服务。
            </view>
            <view class="btn-box">
                <button
                    class="btn disagree"
                    hover-class="hover"
                    @click="disagreePrivacy"
                >
                    不同意
                </button>
                <button
                    class="btn bg-primary text-white"
                    hover-class="hover"
                    id="agree-btn"
                    open-type="agreePrivacyAuthorization"
                    @agreeprivacyauthorization="agreePrivacy"
                >
                    同意
                </button>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const name = ref<string>('')
const show = ref<boolean>(false)

interface PrivacyRes {
    errMsg: string
    privacyContractName: string
    needAuthorization: boolean
}

if (wx.getPrivacySetting) {
    wx.getPrivacySetting({
        success(res: PrivacyRes) {
            console.log(res)
            name.value = res.privacyContractName
            show.value = res.needAuthorization
        }
    })
}

const openContract = () => {
    wx.openPrivacyContract({
        success: () => {},
        fail: () => {}
    })
}

const disagreeHandle = () => {
    // 用户点击拒绝后
    show.value = false
}

const disagreePrivacy = () => {
    uni.$u.toast('同意隐私政策后可继续使用')
    // wx.exitMiniProgram()
}

const agreePrivacy = () => {
    show.value = false
}
</script>

<style scoped>
.modal-box {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99999;
}

.modal-box .dialog {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 40rpx;
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
    background: #ffffff;
    border-radius: 20rpx 20rpx 0 0;
}

.modal-box .title {
    text-align: center;
    color: #333;
    font-weight: bold;
    font-size: 34rpx;
}

.modal-box .content {
    display: block;
    font-size: 28rpx;
    color: #666;
    margin-top: 20rpx;
    text-align: justify;
    line-height: 1.6;
    padding: 10rpx 20rpx;
}

.modal-box .btn-box {
    margin-top: 50rpx;
    padding: 0 30rpx;
    padding-bottom: 30rpx;
    display: flex;
    text-align: center;
}

.modal-box .btn::after {
    border: none;
    display: none;
}

.modal-box .btn-box .btn {
    width: 50%;
    height: 76rpx;
    line-height: 76rpx;
    margin: 0 10rpx;
    padding: 0;
    align-items: center;
    justify-content: center;
    border-radius: 60px;
    font-size: 28rpx;
    font-weight: 500;
}

.modal-box .disagree {
    color: #0f0f0f;
    background: #f5f5f5;
}
</style>

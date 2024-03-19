<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <!-- Main Start -->
    <!-- 头部修改头像 -->
    <view class="header bg-white pt-[30rpx]">
        <view class="flex justify-center pb-5">
            <avatar-upload
                :modelValue="userInfo?.avatar"
                file-key="url"
                :round="true"
                @update:modelValue="handleAvatarChange"
            >
            </avatar-upload>
        </view>
    </view>

    <!-- 用户ID -->
    <view
        class="item text-nr flex justify-between"
        @click=";(showUserName = true), (newUsername = userInfo?.username)"
    >
        <view class="label">账号</view>
        <view class="content">{{ userInfo?.account }}</view>
        <u-icon name="arrow-right" size="22" color="#666"></u-icon>
    </view>

    <!-- 昵称 -->
    <view
        class="item text-nr flex justify-between"
        @click=";(showNickName = true), (newNickname = userInfo?.nickname)"
    >
        <view class="label">昵称</view>
        <view class="content">{{ userInfo?.nickname }}</view>
        <u-icon name="arrow-right" size="22" color="#666"></u-icon>
    </view>

    <!-- 性别 -->
    <view class="item text-nr flex justify-between" @click="changeSex">
        <view class="label">性别</view>
        <view class="content">{{ userInfo?.sex }}</view>
        <u-icon name="arrow-right" size="22" color="#666"></u-icon>
    </view>

    <!-- 手机号 -->
    <view class="item text-nr flex justify-between">
        <view class="label">手机号</view>
        <view class="content">{{
            userInfo?.mobile == '' ? '未绑定手机号' : userInfo?.mobile
        }}</view>

        <!-- #ifdef MP-WEIXIN -->
        <u-button
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
            type="primary"
            shape="circle"
            size="mini"
            :plain="true"
        >
            {{ userInfo?.mobile == '' ? '绑定手机号' : '更换手机号' }}
        </u-button>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <u-button
            @click="showMobilePop = true"
            size="mini"
            type="primary"
            shape="circle"
            :plain="true"
        >
            {{ userInfo?.mobile == '' ? '绑定手机号' : '更换手机号' }}
        </u-button>
        <!-- #endif -->
    </view>

    <!-- 注册时间 -->
    <view class="item text-nr flex justify-between">
        <view class="label">注册时间</view>
        <view class="content">{{ userInfo?.create_time }}</view>
    </view>

    <!-- 昵称修改组件 -->
    <u-popup
        v-model="showNickName"
        :closeable="true"
        mode="center"
        :maskCloseAble="false"
        border-radius="20"
    >
        <view class="px-[50rpx] py-[40rpx] bg-white" style="width: 85vw">
            <form @submit="changeNameConfirm">
                <view class="mb-[70rpx] text-xl text-center">修改昵称</view>
                <u-form-item borderBottom>
                    <input
                        class="nr h-[60rpx] w-full"
                        :value="userInfo.nickname"
                        name="nickname"
                        type="nickname"
                        placeholder="请输入昵称"
                    />
                </u-form-item>
                <view class="mt-[80rpx]">
                    <button
                        class="bg-primary text-white w-full h-[80rpx] !text-lg !leading-[80rpx] rounded-full"
                        form-type="submit"
                        size="mini"
                        hover-class="none"
                    >
                        确定
                    </button>
                </view>
            </form>
        </view>
    </u-popup>

    <!-- 账号修改组件 -->
    <u-popup v-model="showUserName" :closeable="true" mode="center" border-radius="20">
        <view class="px-[50rpx] py-[40rpx] bg-white" style="width: 85vw">
            <view class="mb-[70rpx] text-xl text-center">修改账号</view>
            <u-form-item borderBottom>
                <u-input
                    class="flex-1"
                    v-model="newUsername"
                    placeholder="请输入账号"
                    :border="false"
                />
            </u-form-item>
            <view class="mt-[80rpx]">
                <u-button @click="changeUserNameConfirm" type="primary" shape="circle">
                    确定
                </u-button>
            </view>
        </view>
    </u-popup>

    <!-- 性别修改组件 -->
    <u-picker
        mode="selector"
        v-model="showPicker"
        confirm-color="#4173FF"
        :default-selector="[0]"
        :range="sexList"
        @confirm="changeSexConfirm"
    />

    <!-- 账号修改组件 -->
    <u-popup v-model="showMobilePop" :closeable="true" mode="center" border-radius="20">
        <view class="px-[50rpx] py-[40rpx] bg-white" style="width: 85vw">
            <view class="mb-[70rpx] text-xl text-center">{{ userInfo?.mobile == '' ? '绑定手机号' : '更换手机号' }}</view>
            <u-form-item borderBottom>
                <u-input
                    class="flex-1"
                    v-model="newMobile"
                    placeholder="请输入新的手机号码"
                    :border="false"
                />
            </u-form-item>
            <u-form-item borderBottom>
                <u-input
                    class="flex-1"
                    v-model="mobileCode"
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
            <view class="mt-[80rpx]">
                <u-button @click="changeCodeMobile" type="primary" shape="circle"> 确定 </u-button>
            </view>
        </view>
    </u-popup>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import { onShow, onUnload } from '@dcloudio/uni-app'
import { getUserInfo, userEdit, userBindMobile, userMnpMobile } from '@/api/user'
import { smsSend } from '@/api/app'
import { FieldType, SMSEnum } from '@/enums/appEnums'

// 用户信息
const userInfo = ref<any>({})
// 用户信息的枚举
const fieldType = ref(FieldType.NONE)
//选择性别数据
const sexList = ref<Array<string> | null>(['男', '女'])

//显示昵称弹窗
const showNickName = ref<boolean | null>(false)
//显示账户弹窗
const showUserName = ref<boolean | null>(false)
//显示性别选择弹窗
const showPicker = ref<boolean | null>(false)
// 显示手机号验证码调整弹窗 非小程序才需要
const showMobilePop = ref<boolean | null>(false)

//新昵称
const newNickname = ref<string>('')
//新账号
const newUsername = ref<string>('')
//新的手机号码
const newMobile = ref<string>('')

//修改手机验证码
const mobileCode = ref<string>('')
const codeTips = ref('')
const uCodeRef = shallowRef()

// 获取用户信息
const getUser = async (): Promise<void> => {
    userInfo.value = await getUserInfo()
}

// 获取验证码显示字段
const codeChange = (text: string) => {
    codeTips.value = text
}

// 发送验证码
const sendSms = async () => {
    if (!newMobile.value) return uni.$u.toast('请输入新的手机号码')
    if (uCodeRef.value?.canGetCode) {
        await smsSend({
            scene: userInfo.value.mobile ? SMSEnum.CHANGE_MOBILE : SMSEnum.BIND_MOBILE,
            mobile: newMobile.value
        })
        uni.$u.toast('发送成功')
        uCodeRef.value?.start()
    }
}

const handleAvatarChange = (value) => {
    fieldType.value = FieldType.AVATAR
    setUserInfoFun(value)
}

// 验证码修改手机号-非微信小程序
const changeCodeMobile = async () => {
    await userBindMobile({
        type: userInfo.value.mobile ? 'change' : 'bind',
        mobile: newMobile.value,
        code: mobileCode.value
    })
    uni.$u.toast('操作成功')
    showMobilePop.value = false
    getUser()
}

// 修改用户信息
const setUserInfoFun = async (value: string): Promise<void> => {
    await userEdit({
        field: fieldType.value,
        value: value
    })
    uni.$u.toast('操作成功')
    getUser()
}

// 显示修改用户性别弹窗
const changeSex = () => {
    showPicker.value = true
    fieldType.value = FieldType.SEX
}

// 修改用户性别
const changeSexConfirm = (value) => {
    setUserInfoFun(value[0] + 1)
    showPicker.value = false
}

// 修改用户账号
const changeUserNameConfirm = () => {
    if (newUsername.value == '') return uni.$u.toast('账号不能为空')
    if (newUsername.value.length > 10) return uni.$u.toast('账号长度不得超过十位数')

    fieldType.value = FieldType.USERNAME
    setUserInfoFun(newUsername.value)
    showUserName.value = false
}

// 修改用户昵称
const changeNameConfirm = async (e: any) => {
    newNickname.value = e.detail.value.nickname
    if (newNickname.value == '') return uni.$u.toast('昵称不能为空')
    if (newNickname.value.length > 10) return uni.$u.toast('昵称长度不得超过十位数')
    fieldType.value = FieldType.NICKNAME
    await setUserInfoFun(newNickname.value)

    showNickName.value = false
}

// 微信小程序 绑定｜｜修改用户手机号
const getPhoneNumber = async (e): Promise<void> => {
    const { encryptedData, iv, code } = e.detail
    const data = {
        code,
        encrypted_data: encryptedData,
        iv
    }
    if (encryptedData) {
        await userMnpMobile({
            ...data
        })
        uni.$u.toast('操作成功')
        getUser()
    }
}

const goPage = (url: string) => {
    uni.navigateTo({
        url: url
    })
}

onShow(async () => {
    getUser()
})

onUnload(() => {})
</script>

<style lang="scss">
.header {
    width: 100%;

    image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
    }
}

.item {
    margin-top: 2rpx;
    padding: 30rpx;
    background-color: #ffffff;

    .label {
        width: 150rpx;
    }

    .content {
        flex: 1;
        width: 80%;
    }
}
</style>

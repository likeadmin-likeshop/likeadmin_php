<template>
    <div class="login">
        <div class="text-4xl">欢迎登录</div>
        <ElForm
            ref="formRef"
            class="mt-[35px]"
            size="large"
            :model="formData"
            :rules="formRules"
        >
            <template
                v-if="isAccountLogin && includeLoginWay(LoginWayEnum.ACCOUNT)"
            >
                <ElFormItem prop="account">
                    <ElInput
                        v-model="formData.account"
                        placeholder="请输入账号/手机号"
                    />
                </ElFormItem>
                <ElFormItem prop="password">
                    <ElInput
                        v-model="formData.password"
                        type="password"
                        placeholder="请输入密码"
                    />
                </ElFormItem>
            </template>
            <template
                v-if="isMobileLogin && includeLoginWay(LoginWayEnum.MOBILE)"
            >
                <ElFormItem prop="password">
                    <ElInput
                        v-model="formData.account"
                        placeholder="请输入手机号"
                    />
                </ElFormItem>
                <ElFormItem prop="code">
                    <ElInput
                        v-model="formData.code"
                        placeholder="请输入验证码"
                    />
                </ElFormItem>
            </template>
            <div class="flex justify-between">
                <ElButton type="primary" link @click="changeLoginWay">
                    {{ isAccountLogin ? '手机验证码登录' : '' }}
                    {{ isMobileLogin ? '账号密码登录' : '' }}
                </ElButton>
                <ElButton
                    v-if="isAccountLogin"
                    link
                    @click="setPopupType(PopupTypeEnum.FORGOT_PWD)"
                >
                    忘记密码？
                </ElButton>
            </div>
            <ElFormItem class="mt-[30px]">
                <ElButton
                    class="w-full"
                    type="primary"
                    :loading="isLock"
                    @click="handleLoginLock"
                >
                    登录
                </ElButton>
            </ElFormItem>
            <div class="mt-[40px]">
                <ElDivider>
                    <span class="text-tx-secondary font-normal">
                        第三方登录
                    </span>
                </ElDivider>
                <div class="flex justify-center">
                    <ElButton link>
                        <img
                            class="w-[60px] h-[60px]"
                            src="@/assets/images/icon/icon_wx.png"
                        />
                    </ElButton>
                </div>
            </div>
            <div
                class="mb-[-15px] mx-[-40px] mt-[30px] bg-primary-light-9 rounded-b-md px-[15px] flex justify-between"
            >
                <ElCheckbox v-model="isAgreement">
                    <span class="text-tx-secondary text-sm">
                        已阅读并同意
                        <NuxtLink class="text-tx-primary" target="_blank">
                            《服务协议》
                        </NuxtLink>
                        和
                        <NuxtLink class="text-tx-primary" target="_blank">
                            《隐私政策》
                        </NuxtLink>
                    </span>
                </ElCheckbox>
                <ElButton
                    link
                    type="primary"
                    @click="setPopupType(PopupTypeEnum.REGISTER)"
                >
                    <span class="text-sm">注册账号</span>
                </ElButton>
            </div>
        </ElForm>
    </div>
</template>
<script lang="ts" setup>
import {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElDivider,
    ElCheckbox,
    FormInstance,
    FormRules
} from 'element-plus'
import { useAccount, PopupTypeEnum } from './useAccount'
import { login } from '@/api/account'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
const appStore = useAppStore()
const userStore = useUserStore()
const { setPopupType, toggleShowPopup } = useAccount()
enum LoginWayEnum {
    ACCOUNT = 1,
    MOBILE = 2
}
const isAgreement = ref(false)
const formRef = shallowRef<FormInstance>()
const formRules: FormRules = {
    account: [
        {
            required: true,
            message: '请输入账号/手机号',
            trigger: ['change', 'blur']
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: ['change', 'blur']
        }
    ],
    code: [
        {
            required: true,
            message: '请输入验证码',
            trigger: ['change', 'blur']
        }
    ]
}
const formData = reactive({
    code: '',
    account: '',
    password: '',
    scene: 0
})
const isAccountLogin = computed(() => formData.scene == LoginWayEnum.ACCOUNT)
const isMobileLogin = computed(() => formData.scene == LoginWayEnum.MOBILE)
const includeLoginWay = (way: LoginWayEnum) =>
    appStore.getLoginConfig.login_way?.includes(String(way))
const changeLoginWay = () => {
    if (formData.scene == LoginWayEnum.ACCOUNT) {
        formData.scene = LoginWayEnum.MOBILE
    } else {
        formData.scene = LoginWayEnum.ACCOUNT
    }
}

const handleLogin = async () => {
    await formRef.value?.validate()
    const data = await login(formData)
    userStore.login(data.token)
    await userStore.getUser()
    toggleShowPopup(false)
}
const { lockFn: handleLoginLock, isLock } = useLockFn(handleLogin)
watch(
    () => appStore.getLoginConfig,
    (value) => {
        const { login_way } = value
        if (login_way && login_way.length) {
            formData.scene = login_way.at(0)
        }
    },
    {
        immediate: true
    }
)
</script>

<style lang="scss" scoped></style>

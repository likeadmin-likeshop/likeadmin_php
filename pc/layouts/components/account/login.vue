<template>
    <div class="login">
        <div class="text-4xl">欢迎登录</div>
        <ElForm class="mt-[35px]" size="large" :model="formData">
            <!-- <template
                v-if="isAccountLogin && includeLoginWay(LoginWayEnum.ACCOUNT)"
            > -->
            <ElFormItem>
                <ElInput
                    v-model="formData.account"
                    placeholder="请输入账号/手机号"
                />
            </ElFormItem>
            <ElFormItem>
                <ElInput v-model="formData.password" placeholder="请输入密码" />
            </ElFormItem>
            <!-- </template> -->
            <template
                v-if="isMobileLogin && includeLoginWay(LoginWayEnum.MOBILE)"
            >
                <ElFormItem>
                    <ElInput
                        v-model="formData.account"
                        placeholder="请输入账号/手机号"
                    />
                </ElFormItem>
                <ElFormItem>
                    <ElInput
                        v-model="formData.password"
                        placeholder="请输入密码"
                    />
                </ElFormItem>
            </template>
            <div class="flex justify-between">
                <ElButton type="primary" link>手机验证码登录</ElButton>
                <ElButton link @click="setPopupType(PopupTypeEnum.FORGOT_PWD)">
                    忘记密码？
                </ElButton>
            </div>
            <ElFormItem class="mt-[30px]">
                <ElButton class="w-full" type="primary">登录</ElButton>
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
    ElCheckbox
} from 'element-plus'
import { useAppStore } from '@/stores/app'
import { useAccount, PopupTypeEnum } from './useAccount'
const appStore = useAppStore()
const { setPopupType } = useAccount()
enum LoginWayEnum {
    ACCOUNT = 1,
    MOBILE = 2
}
const isAgreement = ref(false)
const formData = reactive({
    code: '',
    account: '',
    password: '',
    scene: 1
})
const isAccountLogin = computed(() => formData.scene == LoginWayEnum.ACCOUNT)
const isMobileLogin = computed(() => formData.scene == LoginWayEnum.MOBILE)
const includeLoginWay = (way: LoginWayEnum) =>
    appStore.getLoginConfig.login_way?.includes(String(way))
</script>

<style lang="scss" scoped></style>

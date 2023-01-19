<template>
    <div class="login">
        <div class="flex justify-between">
            <span class="text-4xl">忘记登录密码</span>
            <ElButton
                type="primary"
                link
                @click="setPopupType(PopupTypeEnum.LOGIN)"
                v-if="!userStore.isLogin"
            >
                返回登录
            </ElButton>
        </div>
        <ElForm
            ref="formRef"
            class="mt-[35px]"
            size="large"
            :model="formData"
            :rules="formRules"
        >
            <ElFormItem prop="mobile">
                <ElInput
                    v-model="formData.mobile"
                    placeholder="请输入手机号码"
                />
            </ElFormItem>
            <ElFormItem prop="code">
                <ElInput v-model="formData.code" placeholder="请输入验证码">
                    <template #suffix>
                        <div
                            class="flex justify-center leading-5 w-[90px] pl-2.5 border-l border-br"
                        >
                            <VerificationCode
                                ref="verificationCodeRef"
                                @click-get="sendSms"
                            />
                        </div>
                    </template>
                </ElInput>
            </ElFormItem>
            <ElFormItem prop="password">
                <ElInput
                    v-model="formData.password"
                    placeholder="请输入6-20位数字+字母或符号组合"
                    type="password"
                    show-password
                />
            </ElFormItem>
            <ElFormItem prop="password_confirm">
                <ElInput
                    v-model="formData.password_confirm"
                    placeholder="请再次输入密码"
                    type="password"
                    show-password
                />
            </ElFormItem>
            <ElFormItem class="mt-[60px]">
                <ElButton
                    class="w-full"
                    type="primary"
                    @click="handleConfirmLock"
                    :loading="isLock"
                >
                    确认
                </ElButton>
            </ElFormItem>
        </ElForm>
    </div>
</template>
<script lang="ts" setup>
import {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    FormInstance,
    FormRules
} from 'element-plus'
import { smsSend } from '~~/api/app'
import { forgotPassword } from '~~/api/user'
import { SMSEnum } from '~~/enums/appEnums'
import { useUserStore } from '~~/stores/user'
import { useAccount, PopupTypeEnum } from './useAccount'
const userStore = useUserStore()
const { setPopupType, toggleShowPopup } = useAccount()
const formRef = shallowRef<FormInstance>()
const verificationCodeRef = shallowRef()
const formRules: FormRules = {
    mobile: [
        {
            required: true,
            message: '请输入手机号码',
            trigger: ['change', 'blur']
        },
        {
            min: 3,
            max: 12,
            message: '账号长度应为3-12',
            trigger: ['change', 'blur']
        }
    ],
    code: [
        {
            required: true,
            message: '请输入验证码',
            trigger: ['change', 'blur']
        }
    ],
    password: [
        {
            required: true,
            message: '请输入6-20位数字+字母或符号组合',
            trigger: ['change', 'blur']
        },
        {
            min: 6,
            max: 20,
            message: '密码长度应为6-20',
            trigger: ['change', 'blur']
        }
    ],
    password_confirm: [
        {
            validator(rule: any, value: any, callback: any) {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== formData.password) {
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()
                }
            },
            trigger: ['change', 'blur']
        }
    ]
}
const formData = reactive({
    mobile: '',
    password: '',
    code: '',
    password_confirm: ''
})

const sendSms = async () => {
    await formRef.value?.validateField(['mobile'])
    await smsSend({
        scene: SMSEnum.FIND_PASSWORD,
        mobile: formData.mobile
    })
    verificationCodeRef.value?.start()
}

const handleConfirm = async () => {
    await formRef.value?.validate()
    await forgotPassword(formData)
    userStore.logout()
    setPopupType(PopupTypeEnum.LOGIN)
}
const { lockFn: handleConfirmLock, isLock } = useLockFn(handleConfirm)
</script>

<style lang="scss" scoped></style>

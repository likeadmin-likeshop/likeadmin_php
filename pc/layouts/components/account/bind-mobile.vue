<template>
    <div class="login">
        <div class="flex justify-between">
            <span class="text-4xl">
                {{ hasMobile ? '更换手机号' : '绑定手机号' }}
            </span>
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
import { userBindMobile } from '~~/api/user'
import { SMSEnum } from '~~/enums/appEnums'
import { useAccount } from './useAccount'
import { useUserStore } from '@/stores/user'
const { toggleShowPopup } = useAccount()
const userStore = useUserStore()
const formRef = shallowRef<FormInstance>()
const verificationCodeRef = shallowRef()
const formRules: FormRules = {
    mobile: [
        {
            required: true,
            message: '请输入手机号码',
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
const hasMobile = computed(() => !!userStore.userInfo.mobile)
const formData = reactive({
    type: hasMobile.value ? 'change' : 'bind',
    mobile: '',
    code: ''
})

const sendSms = async () => {
    await formRef.value?.validateField(['mobile'])
    await smsSend({
        scene: hasMobile.value ? SMSEnum.CHANGE_MOBILE : SMSEnum.BIND_MOBILE,
        mobile: formData.mobile
    })
    verificationCodeRef.value?.start()
}

const handleConfirm = async () => {
    await formRef.value?.validate()
    if (userStore.isLogin) {
        await userBindMobile(formData)
    } else {
        await userBindMobile(formData, { token: userStore.temToken })
        userStore.login(userStore.temToken)
        await userStore.getUser()
    }
    toggleShowPopup(false)
}
const { lockFn: handleConfirmLock, isLock } = useLockFn(handleConfirm)
</script>

<style lang="scss" scoped></style>

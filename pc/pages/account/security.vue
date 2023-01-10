<template>
    <div class="px-[30px] py-5 user-info">
        <div class="border-b border-br pb-5">
            <span class="text-2xl font-medium">账号安全</span>
        </div>
        <div class="mt-5">
            <div class="info-item leading-10 flex justify-between">
                <div class="item-name">登录密码</div>
                <div>
                    <ElButton
                        link
                        type="primary"
                        @click="showMobilePopup = true"
                    >
                        {{ userInfo.has_password ? '点击修改' : '点击设置' }}
                        <Icon name="el-icon-ArrowRight" />
                    </ElButton>
                </div>
            </div>
            <div class="info-item leading-10 flex justify-between">
                <div class="item-name">绑定微信</div>
                <div>
                    {{ userInfo.has_auth ? '已绑定' : '未绑定' }}
                </div>
            </div>
        </div>
        <ClientOnly>
            <ElDialog
                v-model="showMobilePopup"
                :width="400"
                :close-on-click-modal="false"
            >
                <div class="px-5">
                    <div class="flex justify-between">
                        <span class="text-4xl">
                            {{
                                userInfo.has_password
                                    ? '修改登录密码'
                                    : '设置登录密码'
                            }}
                        </span>
                        <ElButton
                            type="primary"
                            link
                            @click="toForgetPwd"
                            v-if="userInfo.has_password"
                        >
                            忘记原密码
                        </ElButton>
                    </div>
                    <ElForm
                        ref="formRef"
                        class="mt-[35px]"
                        size="large"
                        :model="formData"
                        :rules="formRules"
                    >
                        <ElFormItem
                            prop="old_password"
                            v-if="userInfo.has_password"
                        >
                            <ElInput
                                v-model="formData.old_password"
                                placeholder="请输入原密码"
                                type="password"
                                show-password
                            />
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
            </ElDialog>
        </ClientOnly>
    </div>
</template>
<script lang="ts" setup>
import { getUserInfo, userChangePwd } from '@/api/user'
import {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    FormInstance,
    FormRules,
    ElDialog
} from 'element-plus'
import {
    PopupTypeEnum,
    useAccount
} from '~~/layouts/components/account/useAccount'
import { useUserStore } from '@/stores/user'
const { data: userInfo, refresh } = await useAsyncData(() => getUserInfo(), {
    default: () => ({}),
    initialCache: false
})
const userStore = useUserStore()
const showMobilePopup = ref(false)
const { setPopupType, toggleShowPopup } = useAccount()
const formRef = shallowRef<FormInstance>()
const formRules: FormRules = {
    old_password: [
        {
            required: true,
            message: '请输入原密码',
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
    old_password: '',
    password: '',
    password_confirm: ''
})

const toForgetPwd = () => {
    showMobilePopup.value = false
    setPopupType(PopupTypeEnum.FORGOT_PWD)
    toggleShowPopup(true)
}

const handleConfirm = async () => {
    await formRef.value?.validate()
    await userChangePwd(formData)
    userStore.logout()
    showMobilePopup.value = false
    refresh()
}
const { lockFn: handleConfirmLock, isLock } = useLockFn(handleConfirm)
definePageMeta({
    module: 'personal',
    auth: true
})
</script>
<style lang="scss" scoped>
.user-info {
    .info-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--el-border-color);
        padding: 10px 0;
        .item-name {
            width: 80px;
            color: var(--el-text-color-regular);
        }
    }
}
</style>

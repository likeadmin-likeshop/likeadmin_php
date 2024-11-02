<!-- 个人资料 -->
<template>
    <div class="user-setting">
        <el-card class="!border-none" shadow="never">
            <el-form
                ref="formRef"
                class="ls-form"
                :model="formData"
                :rules="rules"
                label-width="100px"
            >
                <el-form-item label="头像：" prop="avatar">
                    <material-picker v-model="formData.avatar" :limit="1" />
                </el-form-item>

                <el-form-item label="账号：" prop="account">
                    <div class="w-80">
                        <el-input v-model="formData.account" disabled />
                    </div>
                </el-form-item>

                <el-form-item label="名称：" prop="name">
                    <div class="w-80">
                        <el-input v-model="formData.name" placeholder="请输入名称" />
                    </div>
                </el-form-item>

                <el-form-item label="当前密码：" prop="password_old">
                    <div class="w-80">
                        <el-input
                            v-model.trim="formData.password_old"
                            placeholder="修改密码时必填, 不修改密码时留空"
                            type="password"
                            show-password
                        />
                    </div>
                </el-form-item>

                <el-form-item label="新的密码：" prop="password">
                    <div class="w-80">
                        <el-input
                            v-model.trim="formData.password"
                            placeholder="修改密码时必填, 不修改密码时留空"
                            type="password"
                            show-password
                        />
                    </div>
                </el-form-item>

                <el-form-item label="确定密码：" prop="password_confirm">
                    <div class="w-80">
                        <el-input
                            v-model.trim="formData.password_confirm"
                            placeholder="修改密码时必填, 不修改密码时留空"
                            type="password"
                            show-password
                        />
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        <footer-btns>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
        </footer-btns>
    </div>
</template>

<script setup lang="ts" name="userSetting">
import type { FormInstance } from 'element-plus'

import { setUserInfo } from '@/api/user'
import useUserStore from '@/stores/modules/user'
import feedback from '@/utils/feedback'

const formRef = ref<FormInstance>()
const userStore = useUserStore()
// 表单数据
const formData = reactive({
    avatar: '', // 头像
    account: '', // 账号
    name: '', // 名称
    password_old: '', // 当前密码
    password: '', // 新的密码
    password_confirm: '' // 确定密码
})

// 表单校验规则
const rules = reactive<object>({
    avatar: [
        {
            required: true,
            message: '头像不能为空',
            trigger: ['change']
        }
    ],
    name: [
        {
            required: true,
            message: '请输入名称',
            trigger: ['blur']
        }
    ]
})

// 获取个人设置
const getUser = async () => {
    const userInfo = userStore.userInfo
    for (const key in formData) {
        //@ts-ignore
        formData[key] = userInfo[key]
    }
}

// 设置个人设置
const setUser = async () => {
    if (formData.password_old || formData.password || formData.password_confirm) {
        if (!formData.password_old) {
            return feedback.msgError('请输入当前密码')
        }

        if (!formData.password) {
            return feedback.msgError('请输入新的密码')
        }

        if (!formData.password_confirm) {
            return feedback.msgError('请输入确定密码')
        }

        if (formData.password_confirm != formData.password) {
            return feedback.msgError('两次输入的密码不一样')
        }
    }

    if (formData.password_old && formData.password && formData.password_confirm) {
        if (formData.password_old.length < 6 || formData.password_old.length > 32) {
            return feedback.msgError('密码长度在6到32之间')
        }
        if (formData.password.length < 6 || formData.password.length > 32) {
            return feedback.msgError('密码长度在6到32之间')
        }
        if (formData.password_confirm.length < 6 || formData.password_confirm.length > 32) {
            return feedback.msgError('密码长度在6到32之间')
        }
    }
    await setUserInfo(formData)
    userStore.getUserInfo()
}

// 提交数据
const handleSubmit = async () => {
    await formRef.value?.validate()
    setUser()
}

getUser()
</script>

<style lang="scss" scoped></style>

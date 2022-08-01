<template>
    <div class="login flex flex-col">
        <div class="flex-1 flex items-center justify-center">
            <div class="login-card flex rounded-md">
                <div class="flex-1 h-full hidden md:inline-block">
                    <image-contain :src="config.login_image" :width="400" height="100%" />
                </div>
                <div
                    class="login-form bg-body flex flex-col px-10 pt-10 md:w-[400px] w-11/12 flex-none mx-auto"
                >
                    <div class="text-center text-3xl font-medium mb-8">{{ config.web_name }}</div>
                    <el-form ref="formRef" :model="formData" size="large" :rules="rules">
                        <el-form-item prop="account">
                            <el-input
                                v-model="formData.account"
                                placeholder="请输入账号"
                                @keyup.enter="handleEnter"
                            >
                                <template #prepend>
                                    <icon name="el-icon-Avatar" />
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                ref="passwordRef"
                                v-model="formData.password"
                                show-password
                                placeholder="请输入密码"
                                @keyup.enter="handleLogin"
                            >
                                <template #prepend>
                                    <icon name="el-icon-Lock" />
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div class="mb-5">
                        <el-checkbox v-model="remAccount" label="记住账号"></el-checkbox>
                    </div>
                    <el-button
                        type="primary"
                        size="large"
                        :loading="loginLoading"
                        @click="handleLogin"
                    >
                        登录
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, shallowRef } from 'vue'
import type { InputInstance, FormInstance } from 'element-plus'
import useAppStore from '@/stores/modules/app'
import useUserStore from '@/stores/modules/user'
import cache from '@/utils/cache'
import { ECacheKey } from '@/config/enums'
const passwordRef = shallowRef<InputInstance>()
const formRef = shallowRef<FormInstance>()
const appStore = useAppStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const remAccount = ref(false)
const loginLoading = ref(false)
const config = computed(() => appStore.config)
const formData = reactive({
    account: '',
    password: ''
})
const rules = {
    account: [
        {
            required: true,
            message: '请输入账号',
            trigger: ['blur']
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: ['blur']
        }
    ]
}
// 回车按键监听
const handleEnter = () => {
    if (!formData.password) {
        return passwordRef.value?.focus()
    }
    handleLogin()
}
// 登录处理
const handleLogin = () => {
    formRef.value?.validate((valid: boolean) => {
        if (!valid) {
            return
        }
        loginLoading.value = true
        // 记住账号，缓存
        cache.set(ECacheKey.ACCOUNT, {
            remember: remAccount.value,
            account: formData.account
        })
        userStore
            .login(formData)
            .then(() => {
                const {
                    query: { redirect }
                } = route
                const path = typeof redirect === 'string' ? redirect : '/'
                router.replace(path)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                loginLoading.value = false
            })
    })
}

onMounted(() => {
    const value = cache.get(ECacheKey.ACCOUNT)
    if (value?.remember) {
        remAccount.value = value.remember
        formData.account = value.account
    }
})
</script>

<style lang="scss" scoped>
.login {
    background-image: url('./images/login_bg.png');
    @apply min-h-screen bg-no-repeat bg-center bg-cover;
    .login-card {
        height: 400px;
    }
}
</style>

<template>
    <div class="login flex flex-col">
        <div class="flex-1 flex flex-center">
            <div class="login-card bg-white flex">
                <div
                    class="login-img"
                    :style="{
                        'background-image': `url(${config.login_image})`
                    }"
                ></div>
                <div class="login-form flex flex-col">
                    <div class="f-s-24 f-w-500 text-center m-b-40">
                        {{ config.web_name }}
                    </div>
                    <el-form ref="loginFormRefs" :model="loginForm" status-icon :rules="rules">
                        <el-form-item prop="account">
                            <el-input
                                v-model="loginForm.account"
                                placeholder="请输入账号"
                                @keyup.enter="handleEnter"
                            >
                                <template #prepend>
                                    <el-icon><avatar /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                ref="passwordRefs"
                                v-model="loginForm.password"
                                show-password
                                placeholder="请输入密码"
                                @keyup.enter="handleLogin"
                            >
                                <template #prepend>
                                    <el-icon><lock /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div class="m-b-20">
                        <el-checkbox v-model="remAccount" label="记住账号"></el-checkbox>
                    </div>
                    <el-button type="primary" :loading="loginLoading" @click="handleLogin"
                        >登录</el-button
                    >
                </div>
            </div>
        </div>
        <div class="login-footer">
            <div class="flex flex-center muted xs m-t-20">
                <span class="m-r-10">{{ config.copyright_info }}</span>
                <a class="link muted" :href="config.icp_link" target="_blank">{{
                    config.icp_number
                }}</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, Ref, ref } from 'vue'
import { useAdmin } from '@/core/hooks/app'
import { ACCOUNT } from '@/config/cachekey'
import cache from '@/utils/cache'
import { ElInput, ElForm } from 'element-plus'
export default defineComponent({
    setup() {
        const { store, router, route } = useAdmin()
        const passwordRefs: Ref<typeof ElInput | null> = ref(null)
        const loginFormRefs: Ref<typeof ElForm | null> = ref(null)
        const remAccount = ref(false)
        const loginLoading = ref(false)
        const config = computed(() => store.getters.config)
        const loginForm = reactive({
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
        const handleEnter = () => {
            if (!loginForm.password) {
                return passwordRefs.value?.focus()
            }
            handleLogin()
        }
        const handleLogin = () => {
            loginFormRefs.value?.validate((valid: boolean) => {
                if (!valid) {
                    return
                }
                loginLoading.value = true
                // 记住账号，缓存
                cache.set(ACCOUNT, {
                    remember: remAccount.value,
                    account: loginForm.account
                })
                store
                    .dispatch('user/login', loginForm)
                    .then(() => {
                        const {
                            query: { redirect }
                        } = route
                        const path = typeof redirect === 'string' ? redirect : '/'
                        router.replace(path)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => {
                        loginLoading.value = false
                    })
            })
        }

        onMounted(() => {
            const value = cache.get(ACCOUNT)
            if (value.remember) {
                remAccount.value = value.remember
                loginForm.account = value.account
            }
        })
        return {
            config,
            passwordRefs,
            loginFormRefs,
            loginForm,
            loginLoading,
            rules,
            handleEnter,
            handleLogin,
            remAccount
        }
    }
})
</script>

<style lang="scss" scoped>
.login {
    min-height: 100vh;
    background-image: url('./images/login_bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .login-card {
        width: 800px;
        height: 400px;
        border-radius: 10px;
        overflow: hidden;
        .login-img {
            height: 100%;
            width: 50%;
            box-sizing: border-box;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
        .login-form {
            width: 50%;
            box-sizing: border-box;
            padding: 30px 40px 0;
        }
    }
    .login-footer {
        padding: 20px 0;
    }
}
</style>

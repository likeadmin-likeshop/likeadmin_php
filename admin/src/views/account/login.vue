<template>
    <div class="login flex flex-center">
        <div class="login-card bg-white flex">
            <div class="login-img"></div>
            <div class="login-form flex flex-col">
                <div class="f-s-24 f-w-500 text-center m-b-40">管理后台</div>
                <el-form
                    :model="loginForm"
                    status-icon
                    :rules="rules"
                    ref="loginFormRefs"
                >
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
                            v-model="loginForm.password"
                            show-password
                            ref="passwordRefs"
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
                    <el-checkbox
                        v-model="remAccount"
                        label="记住账号"
                    ></el-checkbox>
                </div>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from 'vue'
import { useStore } from 'vuex'
import { ACCOUNT } from '@/config/cachekey'
import cache from '@/utils/cache'
import { useRouter } from 'vue-router'
import { ElInput, ElForm } from 'element-plus'
export default defineComponent({
    setup() {
        const store = useStore()
        const router = useRouter()
        const passwordRefs: Ref<typeof ElInput | null> = ref(null)
        const loginFormRefs: Ref<typeof ElForm | null> = ref(null)
        const remAccount = ref(false)
        const loginForm = reactive({
            account: '',
            password: '',
        })

        const rules = {
            account: [
                {
                    required: true,
                    message: '请输入账号',
                    trigger: ['blur'],
                },
            ],
            password: [
                {
                    required: true,
                    message: '请输入密码',
                    trigger: ['blur'],
                },
            ],
        }
        const handleEnter = () => {
            if (!loginForm.password) {
                return passwordRefs.value?.focus()
            }
            handleLogin()
        }
        const handleLogin = () => {
            loginFormRefs.value?.validate((valid: boolean) => {
                if (!valid) return
                // 记住账号，缓存
                cache.set(ACCOUNT, {
                    remember: remAccount.value,
                    account: loginForm.account,
                })
                store
                    .dispatch('login', loginForm)
                    .then(() => {
                        router.push({
                            path: '/',
                        })
                    })
                    .catch((err) => {
                        console.log(err)
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
            passwordRefs,
            loginFormRefs,
            loginForm,
            rules,
            handleEnter,
            handleLogin,
            remAccount,
        }
    },
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
            background-image: url('./images/login_banner.png');
            background-color: $color-primary;
        }
        .login-form {
            width: 50%;
            box-sizing: border-box;
            padding: 30px 40px 0;
        }
    }
}
</style>

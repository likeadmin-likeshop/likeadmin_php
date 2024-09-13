<!-- 网站信息 -->
<template>
    <div class="login-register">
        <el-form ref="formRef" :rules="rules" :model="formData" label-width="120px">
            <el-card shadow="never" class="!border-none">
                <div class="font-medium mb-7">通用设置</div>

                <el-form-item label="登录方式" prop="login_way">
                    <div>
                        <el-checkbox-group v-model="formData.login_way">
                            <el-checkbox value="1">账号密码登录</el-checkbox>
                            <el-checkbox value="2">手机验证码登录</el-checkbox>
                        </el-checkbox-group>
                        <div class="form-tips">系统通用登录方式，至少选择一项</div>
                    </div>
                </el-form-item>

                <el-form-item label="强制绑定手机" prop="coerce_mobile">
                    <div>
                        <el-switch
                            v-model="formData.coerce_mobile"
                            :active-value="1"
                            :inactive-value="0"
                        />
                        <span class="mt-1 ml-2">{{
                            formData.coerce_mobile ? '开启' : '关闭'
                        }}</span>

                        <div class="form-tips">
                            1、如果开启，则新用户在注册完成之后要强制绑定手机号<br />
                            2、老用户登录时如果检测到没有绑定手机，则要重新绑定手机号
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="政策协议" prop="login_agreement">
                    <div>
                        <el-switch
                            v-model="formData.login_agreement"
                            :active-value="1"
                            :inactive-value="0"
                        />
                        <span class="mt-1 ml-2">
                            {{ formData.login_agreement ? '开启' : '关闭' }}
                        </span>

                        <div class="form-tips">登录/注册会员时，是否显示服务协议和隐私政策</div>
                    </div>
                </el-form-item>
            </el-card>

            <el-card shadow="never" class="!border-none mt-4">
                <div class="font-medium mb-7">第三方设置</div>

                <el-form-item label="第三方登录" prop="third_auth">
                    <div>
                        <el-switch
                            v-model="formData.third_auth"
                            :active-value="1"
                            :inactive-value="0"
                        />
                        <span class="mt-1 ml-2">
                            {{ formData.third_auth ? '开启' : '关闭' }}
                        </span>

                        <div class="form-tips">登录时支持第三方登录，新用户授权即自动注册账号</div>

                        <div>
                            <el-checkbox
                                v-model="formData.wechat_auth"
                                :true-value="1"
                                :false-value="0"
                            >
                                微信登录
                            </el-checkbox>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="微信开放平台">
                    <div>
                        <a href="https://open.weixin.qq.com/" target="_blank">
                            <el-button type="primary" link class="underline">
                                前往微信开放平台
                            </el-button>
                        </a>

                        <div class="form-tips">
                            1、在各渠道使用微信授权登录时，强烈建议配置微信开放平台<br />
                            2、微信开放平台关联公众号、小程序和APP后，可实现各端用户账号统一，识别买家唯一微信身份<br />
                            3、没有配置微信开放平台，同一微信号会生成多个用户，配置微信开放平台后已生成的用户账号无法合并
                        </div>
                    </div>
                </el-form-item>
            </el-card>
        </el-form>

        <footer-btns v-perms="['setting.user.user/setRegisterConfig']">
            <el-button type="primary" @click="handleSubmit">保存</el-button>
        </footer-btns>
    </div>
</template>

<script lang="ts" setup name="loginRegister">
import type { FormInstance, FormRules } from 'element-plus'

import type { LoginSetup } from '@/api/setting/user'
import { getLogin, setLogin } from '@/api/setting/user'

const formRef = ref<FormInstance>()

// 表单数据
const formData = reactive<LoginSetup>({
    login_way: [],
    coerce_mobile: 0,
    login_agreement: 0,
    third_auth: 0,
    wechat_auth: 0,
    qq_auth: 0
})

// 表单验证
const rules = reactive<FormRules>({
    loginWay: [
        {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
                const loginWay = formData.login_way.join('').length
                if (loginWay === 0) {
                    callback(new Error('登录方式至少选择一项！'))
                } else {
                    if (formData.login_way !== '') {
                        if (!formRef.value) return
                        formRef.value.validateField('checkPass')
                    }
                    callback()
                }
            },
            trigger: 'change'
        }
    ],
    coerce_mobile: [{ required: true, trigger: 'blur' }],
    login_agreement: [{ required: true, trigger: 'blur' }],
    third_auth: [{ required: true, trigger: 'blur' }]
})

// 获取登录注册数据
const getData = async () => {
    try {
        const data = await getLogin()
        for (const key in formData) {
            //@ts-ignore
            formData[key] = data[key]
        }
    } catch (error) {
        console.log('获取=>', error)
    }
}

// 保存登录注册数据
const handleSubmit = async () => {
    await formRef.value?.validate()
    try {
        await setLogin(formData)
        getData()
    } catch (error) {
        console.log('保存=>', error)
    }
}

getData()
</script>

<style lang="scss" scoped></style>

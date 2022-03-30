<template>
    <!-- Header Alert Start -->
    <el-card shadow="never">
        <el-alert
            title="温馨提示：请先前往微信公众号后台申请认证微信公众号-服务号。"
            type="primary"
            :closable="false"
            show-icon
        />
    </el-card>
    <!-- Header Alert End -->

    <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px" size="small">
        <!-- 微信公众号 Start -->
        <el-card shadow="never" class="m-t-16">
            <template #header>
                <span class="nr f-w-500">微信公众号</span>
            </template>
            <div class="m-t-24">
                <el-form-item label="名称" prop="name">
                    <el-input class="ls-input" v-model="formData.name" show-word-limit />
                </el-form-item>
                <el-form-item label="原始ID" prop="original_id">
                    <el-input class="ls-input" v-model="formData.original_id" show-word-limit />
                </el-form-item>
                <el-form-item label="二维码" prop="qr_code">
                    <material-select :limit="1" v-model="formData.qr_code" />
                    <div class="muted xs m-r-16">建议尺寸：宽400px*高400px。jpg，jpeg，png格式</div>
                </el-form-item>
            </div>
        </el-card>
        <!-- 微信公众号 End -->

        <!-- 公众号开发者信息 Start -->
        <el-card shadow="never" class="m-t-16">
            <template #header>
                <span class="nr f-w-500">公众号开发者信息</span>
            </template>
            <div class="m-t-24">
                <el-form-item label="AppID" prop="app_id">
                    <el-input class="ls-input" v-model="formData.app_id" show-word-limit />
                </el-form-item>
                <el-form-item label="AppSecret" prop="app_secret">
                    <el-input class="ls-input" v-model="formData.app_secret" show-word-limit />
                    <div class="muted xs m-r-16">登录微信公众平台，点击开发>基本配置>公众号开发信息，设置AppID和AppSecret</div>
                </el-form-item>
            </div>
        </el-card>
        <!-- 公众号开发者信息 End -->

        <!-- 服务器配置 Start -->
        <el-card shadow="never" class="m-t-16">
            <template #header>
                <span class="nr f-w-500">服务器配置</span>
            </template>
            <div class="m-t-24">
                <el-form-item label="URL">
                    <el-input
                        class="ls-input m-r-16"
                        v-model="formData.url"
                        show-word-limit
                        disabled
                    />
                    <el-button v-on:copy="formData.url">复制</el-button>
                    <div class="muted xs">登录微信公众平台，点击开发>基本配置>服务器配置，填写服务器地址（URL）</div>
                </el-form-item>
                <el-form-item label="Token" prop="token">
                    <el-input class="ls-input" v-model="formData.token" show-word-limit />
                    <div class="muted xs">登录微信公众平台，点击开发>基本配置>服务器配置，设置令牌Token。不填默认为“likeshop”</div>
                </el-form-item>
                <el-form-item label="EncodingAESKey" prop="encoding_aes_key">
                    <el-input class="ls-input" v-model="formData.encoding_aes_key" show-word-limit />
                    <div class="muted xs">消息加密密钥由43位字符组成，字符范围为A-Z,a-z,0-9</div>
                </el-form-item>
                <el-form-item label="消息加密方式" prop="encryption_type">
                    <el-radio-group v-model="formData.encryption_type">
                        <el-radio :label="1" class="form__item-encryption">明文模式 (不使用消息体加解密功能，安全系数较低)</el-radio>
                        <el-radio
                            :label="2"
                            class="form__item-encryption"
                        >兼容模式 (明文、密文将共存，方便开发者调试和维护)</el-radio>
                        <el-radio
                            :label="3"
                            class="form__item-encryption"
                        >安全模式（推荐） (消息包为纯密文，需要开发者加密和解密，安全系数高)</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
        </el-card>
        <!-- 服务器配置 End -->

        <!-- 功能设置 Start -->
        <el-card shadow="never" class="m-t-16">
            <template #header>
                <span class="nr f-w-500">功能设置</span>
            </template>
            <div class="m-t-24">
                <el-form-item label="业务域名">
                    <el-input
                        class="ls-input m-r-16"
                        v-model="formData.business_domain"
                        show-word-limit
                        disabled
                    />
                    <el-button class="m-l-16" v-on:copy="formData.business_domain">复制</el-button>
                    <div class="muted xs">登录微信公众平台，点击设置>公众号设置>功能设置，填写业务域名</div>
                </el-form-item>
                <el-form-item label="JS接口安全域名">
                    <el-input
                        class="ls-input m-r-16"
                        v-model="formData.js_secure_domain"
                        show-word-limit
                        disabled
                    />
                    <el-button class="m-l-16" v-on:copy="formData.js_secure_domain">复制</el-button>
                    <div class="muted xs">登录微信公众平台，点击设置>公众号设置>功能设置，填写JS接口安全域名</div>
                </el-form-item>
                <el-form-item label="网页授权域名">
                    <el-input
                        class="ls-input m-r-16"
                        v-model="formData.web_auth_domain"
                        show-word-limit
                        disabled
                    />
                    <el-button v-on:copy="formData.web_auth_domain">复制</el-button>
                    <div class="muted xs">登录微信公众平台，点击设置>公众号设置>功能设置，填写网页授权域名</div>
                </el-form-item>
            </div>
        </el-card>
        <!-- 功能设置 Start -->
    </el-form>

    <!-- Footer Start -->
    <footer-btns>
        <el-button size="small" @click="onResetFrom">重置</el-button>
        <el-button type="primary" size="small" @click="onSubmitFrom(formRef)">保存</el-button>
    </footer-btns>
    <!-- Footer End -->
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import MaterialSelect from '@/components/material-select/index.vue'
import { apiMpWeChatConfigEdit, apiMPWeChatConfigInfo } from '@/api/channel/mp_wechat'
import { ElMessage } from 'element-plus'
import type { ElForm } from "element-plus";
import FooterBtns from '@/components/footer-btns/index.vue'

/** Interface Start **/
interface formDataObj {
    name: string
    original_id: string
    qr_code: string
    app_id: string
    app_secret: string
    url?: string
    token: string
    encoding_aes_key: string
    encryption_type: string
    business_domain?: string
    js_secure_domain?: string
    web_auth_domain?: string
}

type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>();
/** Interface End **/

/** Data Start **/
// 表单数据
let formData = ref<formDataObj>({
    name: '',                   // 公众号名称
    original_id: '',            // 原始id
    qr_code: '',                // 二维码
    app_id: '',                 // APP ID
    app_secret: '',             // App Secret
    url: '',                    // URL
    token: '',                  // Token
    encoding_aes_key: '',       // Encoding AES Key
    encryption_type: '',        // 消息加密方式: 1-明文模式 2-兼容模式 3-安全模式
    business_domain: '',        // 业务域名
    js_secure_domain: '',       // JS接口安全域名
    web_auth_domain: ''        // 网页授权域名
})
// 表单验证
const rules = reactive<object>({
    app_id: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
    app_secret: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
    encryption_type: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
})
/** Data End **/


/** S Methods **/
// 初始化表单数据
const initFormData = async (): Promise<void> => {
    formData.value = await apiMPWeChatConfigInfo()
    console.log(formData.value)
}

// 重置表单数据
const onResetFrom = () => {
    initFormData()
    ElMessage.info('已重置数据')
}

// 编辑数据
const handleFormEdit = async (): Promise<void> => {
    await apiMpWeChatConfigEdit({ ...formData.value })
    initFormData()
}

// 提交表单
const onSubmitFrom = async (formEl: FormInstance | undefined): Promise<void> => {
    if (!formEl) return
    formEl.validate((valid): boolean | undefined => {
        if (!valid) return false
        handleFormEdit()
    })
}
/** E Methods **/


/** S Life Cycle **/
initFormData()
/** E Life Cycle **/
</script>


<style lang="scss" scoped>
.ls-input {
    width: 280px;
}
.form__item-encryption {
    display: flex;
    align-items: center;
    height: 3em;
}
</style>
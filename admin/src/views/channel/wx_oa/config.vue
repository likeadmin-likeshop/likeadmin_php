<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-alert
                type="warning"
                title="温馨提示：填写微信公众号开发配置，请前往微信公众平台申请服务号并完成认证"
                :closable="false"
                show-icon
            />
        </el-card>
        <el-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            :label-width="appStore.isMobile ? '80px' : '160px'"
        >
            <el-card class="!border-none mt-4" shadow="never">
                <div class="font-medium mb-7">微信公众号</div>
                <el-form-item label="公众号名称" prop="name">
                    <div class="w-80">
                        <el-input v-model="formData.name" placeholder="请输入公众号名称" />
                    </div>
                </el-form-item>
                <el-form-item label="原始ID" prop="original_id">
                    <div class="w-80">
                        <el-input v-model="formData.original_id" placeholder="请输入原始ID" />
                    </div>
                </el-form-item>
                <el-form-item label="公众号二维码" prop="qr_code">
                    <div>
                        <div>
                            <material-picker v-model="formData.qr_code" :limit="1" />
                        </div>
                        <div class="form-tips">建议尺寸：宽400px*高400px。jpg，jpeg，png格式</div>
                    </div>
                </el-form-item>
            </el-card>
            <el-card class="!border-none mt-4" shadow="never">
                <div class="font-medium mb-7">公众号开发者信息</div>
                <el-form-item label="AppID" prop="app_id">
                    <div class="w-80">
                        <el-input v-model="formData.app_id" placeholder="请输入AppID" />
                    </div>
                </el-form-item>
                <el-form-item label="AppSecret" prop="app_secret">
                    <div class="w-80">
                        <el-input v-model="formData.app_secret" placeholder="请输入AppSecret" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="form-tips">
                        小程序账号登录微信公众平台，点击开发>开发设置->开发者ID，设置AppID和AppSecret
                    </div>
                </el-form-item>
            </el-card>
            <el-card class="!border-none mt-4" shadow="never">
                <div class="font-medium mb-7">服务器配置</div>
                <el-form-item label="URL">
                    <div class="flex-1 min-w-0">
                        <div class="sm:flex">
                            <div class="mr-4 sm:w-80 flex">
                                <el-input v-model="formData.url" disabled />
                            </div>
                            <el-button v-copy="formData.url">复制</el-button>
                        </div>
                        <div class="form-tips">
                            登录微信公众平台，点击开发>基本配置>服务器配置，填写服务器地址（URL）
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="Token" prop="Token">
                    <div class="flex-1 min-w-0">
                        <div class="w-80">
                            <el-input v-model="formData.token" placeholder="请输入Token" />
                        </div>
                        <div class="form-tips">
                            登录微信公众平台，点击开发>基本配置>服务器配置，设置令牌Token。不填默认为“likeshop”
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="EncodingAESKey" prop="encoding_aes_key">
                    <div class="flex-1 min-w-0">
                        <div class="w-80">
                            <el-input
                                v-model="formData.encoding_aes_key"
                                placeholder="请输入EncodingAESKey"
                            />
                        </div>
                        <div class="form-tips">
                            消息加密密钥由43位字符组成，字符范围为A-Z,a-z,0-9
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="消息加密方式" required prop="encryption_type">
                    <div class="flex-1 min-w-0">
                        <el-radio-group
                            class="flex-col !items-start min-w-0"
                            v-model="formData.encryption_type"
                        >
                            <el-radio :value="1">
                                明文模式 (不使用消息体加解密功能，安全系数较低)
                            </el-radio>

                            <el-radio :value="2">
                                兼容模式 (明文、密文将共存，方便开发者调试和维护)
                            </el-radio>
                            <el-radio :value="3">
                                安全模式（推荐） (消息包为纯密文，需要开发者加密和解密，安全系数高)
                            </el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
            </el-card>
            <el-card class="!border-none mt-4" shadow="never">
                <div class="font-medium mb-7">功能设置</div>
                <el-form-item label="业务域名">
                    <div class="flex-1 min-w-0">
                        <div class="sm:flex">
                            <div class="mr-4 sm:w-80 flex">
                                <el-input v-model="formData.business_domain" disabled />
                            </div>
                            <el-button v-copy="formData.business_domain">复制</el-button>
                        </div>
                        <div class="form-tips">
                            登录微信公众平台，点击设置>公众号设置>功能设置，填写业务域名
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="JS接口安全域名">
                    <div class="flex-1 min-w-0">
                        <div class="sm:flex">
                            <div class="mr-4 sm:w-80 flex">
                                <el-input v-model="formData.js_secure_domain" disabled />
                            </div>
                            <el-button v-copy="formData.js_secure_domain">复制</el-button>
                        </div>
                        <div class="form-tips">
                            登录微信公众平台，点击设置>公众号设置>功能设置，填写JS接口安全域名
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="网页授权域名">
                    <div class="flex-1 min-w-0">
                        <div class="sm:flex">
                            <div class="mr-4 sm:w-80 flex">
                                <el-input v-model="formData.web_auth_domain" disabled />
                            </div>
                            <el-button v-copy="formData.web_auth_domain">复制</el-button>
                        </div>
                        <div class="form-tips">
                            登录微信公众平台，点击设置>公众号设置>功能设置，填写网页授权域名
                        </div>
                    </div>
                </el-form-item>
            </el-card>
        </el-form>
        <footer-btns v-perms="['channel.official_account_setting/setConfig']">
            <el-button type="primary" @click="handelSave">保存</el-button>
        </footer-btns>
    </div>
</template>
<script lang="ts" setup name="wxOaConfig">
import type { FormInstance } from 'element-plus'

import { getOaConfig, setOaConfig } from '@/api/channel/wx_oa'
import useAppStore from '@/stores/modules/app'

const appStore = useAppStore()
const formData = reactive({
    name: '',
    original_id: ' ',
    qr_code: '',
    app_id: '',
    app_secret: '',
    url: '',
    token: '',
    encoding_aes_key: '',
    encryption_type: 1,
    business_domain: '',
    js_secure_domain: '',
    web_auth_domain: ''
})

const formRef = shallowRef<FormInstance>()
const formRules = {
    app_id: [
        {
            required: true,
            message: '请输入AppID',
            trigger: ['blur', 'change']
        }
    ],
    app_secret: [
        {
            required: true,
            message: '请输入AppSecret',
            trigger: ['blur', 'change']
        }
    ]
}

const getDetail = async () => {
    const data = await getOaConfig()
    for (const key in formData) {
        //@ts-ignore
        formData[key] = data[key]
    }
}

const handelSave = async () => {
    await formRef.value?.validate()
    await setOaConfig(formData)
    getDetail()
}

getDetail()
</script>

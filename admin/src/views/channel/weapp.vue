<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-alert
                type="warning"
                title="温馨提示：填写微信小程序开发配置，请前往微信公众平台申请小程序并完成认证"
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
                <div class="font-medium mb-7">微信小程序</div>
                <el-form-item label="小程序名称" prop="name">
                    <div class="w-80">
                        <el-input v-model="formData.name" placeholder="请输入小程序名称" />
                    </div>
                </el-form-item>
                <el-form-item label="原始ID" prop="original_id">
                    <div class="w-80">
                        <el-input v-model="formData.original_id" placeholder="请输入原始ID" />
                    </div>
                </el-form-item>
                <el-form-item label="小程序码" prop="qr_code">
                    <div class="flex-1">
                        <div>
                            <material-picker v-model="formData.qr_code" :limit="1" />
                        </div>
                        <div class="form-tips">建议尺寸：宽400px*高400px。jpg，jpeg，png格式</div>
                    </div>
                </el-form-item>
            </el-card>
            <el-card class="!border-none mt-4" shadow="never">
                <div class="font-medium mb-7">开发者ID</div>
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
                <div class="font-medium mb-7">服务器域名</div>
                <el-form-item label="request合法域名" prop="appId">
                    <div class="flex-1 min-w-0">
                        <div class="sm:flex">
                            <div class="mr-4 sm:w-80 flex">
                                <el-input v-model="formData.request_domain" disabled />
                            </div>
                            <el-button v-copy="formData.request_domain">复制</el-button>
                        </div>
                        <div class="form-tips">
                            小程序账号登录微信公众平台，点击开发>开发设置->服务器域名，填写https协议域名
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="socket合法域名">
                    <div class="flex-1 min-w-0">
                        <div class="sm:flex">
                            <div class="mr-4 sm:w-80 flex">
                                <el-input v-model="formData.socket_domain" disabled />
                            </div>
                            <el-button v-copy="formData.socket_domain">复制</el-button>
                        </div>
                        <div class="form-tips">
                            小程序账号登录微信公众平台，点击开发>开发设置->服务器域名，填写wss协议域名
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="uploadFile合法域名">
                    <div class="flex-1 min-w-0">
                        <div class="sm:flex">
                            <div class="mr-4 sm:w-80 flex">
                                <el-input v-model="formData.upload_file_domain" disabled />
                            </div>
                            <el-button v-copy="formData.upload_file_domain">复制</el-button>
                        </div>
                        <div class="form-tips">
                            小程序账号登录微信公众平台，点击开发>开发设置->服务器域名，填写https协议域名
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="downloadFile合法域名">
                    <div class="flex-1 min-w-0">
                        <div class="sm:flex">
                            <div class="mr-4 sm:w-80 flex">
                                <el-input v-model="formData.download_file_domain" disabled />
                            </div>
                            <el-button v-copy="formData.download_file_domain">复制</el-button>
                        </div>
                        <div class="form-tips">
                            小程序账号登录微信公众平台，点击开发>开发设置->服务器域名，填写https协议域名
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="udp合法域名">
                    <div class="flex-1 min-w-0">
                        <div class="sm:flex">
                            <div class="mr-4 sm:w-80 flex">
                                <el-input v-model="formData.udp_domain" disabled />
                            </div>
                            <el-button v-copy="formData.udp_domain">复制</el-button>
                        </div>
                        <div class="form-tips">
                            小程序账号登录微信公众平台，点击开发>开发设置->服务器域名，填写udp协议域名
                        </div>
                    </div>
                </el-form-item>
            </el-card>
            <el-card class="!border-none mt-4" shadow="never">
                <div class="font-medium mb-7">业务域名</div>
                <el-form-item label="业务域名">
                    <div class="flex-1 min-w-0">
                        <div class="sm:flex">
                            <div class="mr-4 sm:w-80 flex">
                                <el-input v-model="formData.business_domain" disabled />
                            </div>
                            <el-button v-copy="formData.business_domain">复制</el-button>
                        </div>
                        <div class="form-tips">
                            小程序账号登录微信公众平台，点击开发>开发设置->业务域名，填写业务域名
                        </div>
                    </div>
                </el-form-item>
            </el-card>
        </el-form>
        <footer-btns v-perms="['channel.mnp_settings/setConfig']">
            <el-button type="primary" @click="handelSave">保存</el-button>
        </footer-btns>
    </div>
</template>
<script lang="ts" setup name="weappConfig">
import type { FormInstance } from 'element-plus'

import { getWeappConfig, setWeappConfig } from '@/api/channel/weapp'
import useAppStore from '@/stores/modules/app'

const appStore = useAppStore()
const formData = reactive({
    name: '',
    original_id: '',
    qr_code: '',
    app_id: '',
    app_secret: '',
    business_domain: '',
    download_file_domain: '',
    request_domain: '',
    socket_domain: '',
    tcpDomain: '',
    udp_domain: '',
    upload_file_domain: ''
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
    const data = await getWeappConfig()
    for (const key in formData) {
        //@ts-ignore
        formData[key] = data[key]
    }
}

const handelSave = async () => {
    await formRef.value?.validate()
    await setWeappConfig(formData)
    getDetail()
}

getDetail()
</script>

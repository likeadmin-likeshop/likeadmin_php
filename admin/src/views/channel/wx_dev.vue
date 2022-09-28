<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-alert
                type="warning"
                title="温馨提示：填写微信开放平台开发配置，请前往微信开放平台创建应用并完成认证；APP应用配置主要用于APP微信登录和微信支付"
                :closable="false"
                show-icon
            />
        </el-card>
        <el-form ref="formRef" :model="formData" label-width="160px">
            <el-card class="!border-none mt-4" shadow="never">
                <div class="font-medium mb-7">APP应用</div>
                <el-form-item label="AppID" prop="appId">
                    <div class="w-80">
                        <el-input v-model="formData.appId" placeholder="请输入AppID" />
                    </div>
                </el-form-item>
                <el-form-item label="AppSecret" prop="appSecret">
                    <div>
                        <div class="w-80">
                            <el-input v-model="formData.appSecret" placeholder="请输入AppSecret" />
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="form-tips">
                        小程序账号登录微信公众平台，点击开发>开发设置->开发者ID，设置AppID和AppSecret
                    </div>
                </el-form-item>
            </el-card>
        </el-form>
        <footer-btns v-perms="['channel:wx:save']">
            <el-button type="primary" @click="handelSave">保存</el-button>
        </footer-btns>
    </div>
</template>
<script lang="ts" setup name="wxDevConfig">
import { getWxDevConfig, setWxDevConfig } from '@/api/channel/wx_dev'
import feedback from '@/utils/feedback'

const formData = reactive({
    appId: '',
    appSecret: ''
})

const getDetail = async () => {
    const data = await getWxDevConfig()
    for (const key in formData) {
        //@ts-ignore
        formData[key] = data[key]
    }
}

const handelSave = async () => {
    await setWxDevConfig(formData)
    getDetail()
    feedback.msgSuccess('操作成功')
}

getDetail()
</script>

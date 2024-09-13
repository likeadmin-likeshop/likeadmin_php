<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            title="设置短信"
            :async="true"
            width="550px"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <el-form ref="formRef" :model="formData" label-width="120px" :rules="formRules">
                <el-form-item label="短信渠道">
                    <div>
                        {{ formData.name }}
                    </div>
                </el-form-item>
                <el-form-item label="短信签名" prop="sign">
                    <el-input v-model="formData.sign" placeholder="请输入短信签名" />
                </el-form-item>
                <el-form-item label="APP_KEY" prop="app_key" v-if="formData.type == 'ali'">
                    <el-input v-model="formData.app_key" placeholder="请输入APP_KEY" />
                </el-form-item>
                <el-form-item label="APP_ID" prop="app_id" v-if="formData.type == 'tencent'">
                    <el-input v-model="formData.app_id" placeholder="请输入APP_ID" />
                </el-form-item>
                <el-form-item label="SECRET_ID" prop="secret_id" v-if="formData.type == 'tencent'">
                    <el-input v-model="formData.secret_id" placeholder="请输入SECRET_ID" />
                </el-form-item>
                <el-form-item label="SECRET_KEY" prop="secret_key">
                    <el-input v-model="formData.secret_key" placeholder="请输入SECRET_KEY" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio :value="0">关闭</el-radio>
                        <el-radio :value="1">开启</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'

import { setSmsConfig, smsDetail } from '@/api/message'
import Popup from '@/components/popup/index.vue'

const emit = defineEmits(['success'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const formData = reactive({
    name: '',
    type: '',
    sign: '',
    app_key: '',
    app_id: '',
    secret_key: '',
    secret_id: '',
    status: 0
})

const formRules = {
    sign: [
        {
            required: true,
            message: '请输入短信签名',
            trigger: 'blur'
        }
    ],
    app_id: [
        {
            required: true,
            message: '请输入APP_ID',
            trigger: 'blur'
        }
    ],
    app_key: [
        {
            required: true,
            message: '请输入APP_KEY',
            trigger: 'blur'
        }
    ],
    secret_key: [
        {
            required: true,
            message: '请输入SECRET_KEY',
            trigger: 'blur'
        }
    ],
    secret_id: [
        {
            required: true,
            message: '请输入SECRET_ID',
            trigger: 'blur'
        }
    ]
}

const handleSubmit = async () => {
    await formRef.value?.validate()
    await setSmsConfig(formData)
    popupRef.value?.close()
    emit('success')
}

const getDetail = async () => {
    const data = await smsDetail({
        type: formData.type
    })
    for (const key in data) {
        //@ts-ignore
        formData[key] = data[key]
    }
}

const open = (type: string) => {
    formData.type = type
    popupRef.value?.open()
    getDetail()
}

const handleClose = () => {
    formRef.value?.resetFields()
}

defineExpose({
    open
})
</script>

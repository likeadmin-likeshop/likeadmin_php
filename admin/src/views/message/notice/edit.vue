<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-page-header content="编辑通知设置" @back="$router.back()" />
        </el-card>
        <el-form
            ref="formRef"
            :model="formData"
            label-width="120px"
            :rules="rules"
            v-loading="loading"
        >
            <el-card class="!border-none mt-4" shadow="never">
                <div class="font-medium mb-7">通知名称</div>
                <el-form-item label="通知名称"> {{ formData.scene_name }} </el-form-item>
                <el-form-item label="通知类型"> {{ formData.type }} </el-form-item>
                <el-form-item label="通知业务"> {{ formData.scene_desc }} </el-form-item>
            </el-card>
            <el-card class="!border-none mt-4" shadow="never">
                <div class="font-medium mb-7">短信通知</div>
                <el-form-item label="开启状态" prop="sms_notice.status" required>
                    <el-radio-group v-model="formData.sms_notice.status">
                        <el-radio value="0">关闭</el-radio>
                        <el-radio value="1">开启</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="模板ID" prop="sms_notice.template_id">
                    <div class="w-80">
                        <el-input
                            v-model="formData.sms_notice.template_id"
                            placeholder="请输入模板ID"
                        />
                    </div>
                </el-form-item>
                <el-form-item label="短信内容" prop="sms_notice.content">
                    <div class="flex-1">
                        <div class="w-full max-w-[320px]">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 6, maxRows: 6 }"
                                v-model="formData.sms_notice.content"
                            />
                        </div>
                        <div class="form-tips">
                            <div v-for="(item, index) in formData.sms_notice.tips" :key="index">
                                {{ item }}
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-card>
        </el-form>
        <footer-btns>
            <el-button type="primary" @click="handleSave">保存</el-button>
        </footer-btns>
    </div>
</template>

<script lang="ts" setup name="noticeEdit">
import type { FormInstance } from 'element-plus'
import { pick } from 'lodash'

import { noticeDetail, setNoticeConfig } from '@/api/message'
import useMultipleTabs from '@/hooks/useMultipleTabs'
import feedback from '@/utils/feedback'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const formData = reactive({
    id: '',
    scene_name: '',
    type: '',
    scene_desc: '',
    sms_notice: {
        status: 0,
        template_id: '',
        content: '',
        tips: []
    },
    oa_notice: {},
    mnp_notice: {},
    system_notice: {}
})

const rules = {
    'sms_notice.template_id': [
        {
            required: true,
            message: '请输入模板ID',
            trigger: 'blur'
        }
    ],
    'sms_notice.content': [
        {
            required: true,
            message: '请输入短信内容',
            trigger: 'blur'
        }
    ]
}
const { removeTab } = useMultipleTabs()
const formRef = shallowRef<FormInstance>()

const getDetails = async () => {
    loading.value = true
    const data = await noticeDetail({
        id: route.query.id
    })
    Object.keys(data).forEach((key) => {
        //@ts-ignore
        formData[key] = data[key]
    })
    loading.value = false
}

const handleSave = async () => {
    await formRef.value?.validate()
    const data = {
        id: formData.id,
        template: pick(formData, ['sms_notice', 'oa_notice', 'mnp_notice', 'system_notice'])
    }
    await setNoticeConfig(data)
    feedback.msgSuccess('操作成功')
    removeTab()
    router.back()
}

route.query.id && getDetails()
</script>

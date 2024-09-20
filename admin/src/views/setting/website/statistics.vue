<!-- 站点统计 -->
<template>
    <div class="website-statistics">
        <el-form
            ref="formRef"
            :rules="rules"
            class="ls-form"
            :model="formData"
            scroll-to-error
            label-width="60px"
        >
            <el-card shadow="never" class="!border-none">
                <el-form-item label="站点统计代码" prop="clarityAppId" label-width="100">
                    <div class="w-80">
                        <el-input
                            v-model.trim="formData.clarity_code"
                            type="textarea"
                            placeholder="站点统计代码"
                            maxlength="3000"
                            show-word-limit
                        />
                    </div>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="handleSubmit">保存</el-button>
                </el-form-item>
            </el-card>
        </el-form>
    </div>
</template>

<script lang="ts" setup name="webInformation">
import type { FormInstance } from 'element-plus'

import { getSiteStatistics, setSiteStatistics } from '@/api/setting/website'

const formRef = ref<FormInstance>()

// 表单数据
const formData = reactive({
    clarity_code: '' // Clarity代码片段
})

// 表单验证
const rules = {
    clarity_code: [
        {
            required: true,
            message: 'Clarity代码片段不能为空',
            trigger: ['blur']
        }
    ]
}

// 获取站点统计配置
const getData = async () => {
    const data = await getSiteStatistics()
    for (const key in formData) {
        //@ts-ignore
        formData[key] = data[key]
    }
}

// 设置站点统计配置
const handleSubmit = async () => {
    await formRef.value?.validate()
    await setSiteStatistics(formData)
    getData()
}

onMounted(() => {
    getData()
})
</script>

<style lang="scss" scoped></style>

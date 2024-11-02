<!-- 站点统计 -->
<template>
    <div class="website-statistics">
        <el-form
            ref="formRef"
            :rules="rules"
            class="ls-form"
            :model="formData"
            scroll-to-error
            label-width="120px"
        >
            <el-card shadow="never" class="!border-none">
                <div class="text-xl font-medium mb-[20px]">Clarity配置</div>
                <el-form-item label="应用ID" prop="clarity_code">
                    <div class="flex flex-col">
                        <div class="w-80">
                            <el-input
                                v-model.trim="formData.clarity_code"
                                placeholder="请填写应用ID"
                                maxlength="10"
                                show-word-limit
                            />
                        </div>
                        <div class="form-tips">
                            请前往<a
                                class="text-primary"
                                href="https://clarity.microsoft.com"
                                target="_blank"
                            >
                                《Clarity官网》
                            </a>
                            创建Clarity统计应用
                        </div>
                    </div>
                </el-form-item>
            </el-card>
        </el-form>
        <footer-btns v-perms="['setting.web.web_setting/setWebsite']">
            <el-button type="primary" @click="handleSubmit">保存</el-button>
        </footer-btns>
    </div>
</template>

<script lang="ts" setup name="webInformation">
import type { FormInstance } from 'element-plus'

import { getSiteStatistics, setSiteStatistics } from '@/api/setting/website'

const formRef = ref<FormInstance>()

// 表单数据
const formData = reactive<{
    clarity_code: string
}>({
    clarity_code: '' // Clarity应用ID
})

// 表单验证
const rules = {}

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

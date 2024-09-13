<template>
    <div class="export-data">
        <popup
            ref="popupRef"
            title="导出设置"
            width="500px"
            confirm-button-text="确认导出"
            @confirm="handleConfirm"
            :async="true"
            @open="getData"
        >
            <template #trigger>
                <el-button>导出</el-button>
            </template>
            <div>
                <el-form ref="formRef" :model="formData" label-width="120px" :rules="formRules">
                    <el-form-item label="数据量：">
                        预计导出{{ exportData.count }}条数据， 共{{ exportData.sum_page }}页，每页{{
                            exportData.page_size
                        }}条数据
                    </el-form-item>
                    <el-form-item label="导出限制：">
                        每次导出最大允许{{ exportData.max_page }}页，共{{
                            exportData.all_max_size
                        }}条数据
                    </el-form-item>
                    <el-form-item prop="page_type" label="导出范围：" required>
                        <el-radio-group v-model="formData.page_type">
                            <el-radio :value="0">全部导出</el-radio>
                            <el-radio :value="1">分页导出</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="分页范围：" v-if="formData.page_type == 1">
                        <div class="flex">
                            <el-form-item prop="page_start">
                                <el-input
                                    style="width: 140px"
                                    v-model.number="formData.page_start"
                                    placeholder=""
                                ></el-input>
                            </el-form-item>
                            <span class="flex-none ml-2 mr-2">页，至</span>
                            <el-form-item prop="page_end">
                                <el-input
                                    style="width: 140px"
                                    v-model.number="formData.page_end"
                                    placeholder=""
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item label="导出文件名称：" prop="file_name">
                        <el-input
                            v-model="formData.file_name"
                            placeholder="请输入导出文件名称"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </popup>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'

import Popup from '@/components/popup/index.vue'
import feedback from '@/utils/feedback'

const formRef = shallowRef<FormInstance>()
const props = defineProps({
    params: {
        type: Object,
        default: () => ({})
    },
    pageSize: {
        type: Number,
        default: 25
    },
    fetchFun: {
        type: Function,
        required: true
    }
})
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const formData = reactive({
    page_type: 0,
    page_start: 1,
    page_end: 200,
    file_name: ''
})

const formRules = {
    page_start: [
        { required: true, message: '请输入起始页码' },
        { type: 'number', message: '页码必须是整数' },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value <= 0) return callback(new Error('页码必须大于0'))
                callback()
            }
        }
    ],
    page_end: [
        { required: true, message: '请输入结束页码' },
        { type: 'number', message: '页码必须是整数' },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value <= 0) return callback(new Error('页码必须大于0'))
                callback()
            }
        }
    ]
}

const exportData = reactive({
    count: 0,
    sum_page: 0,
    page_size: 0,
    max_page: 0,
    all_max_size: 0
})

const getData = async () => {
    const res = await props.fetchFun({
        ...props.params,
        page_size: props.pageSize,
        export: 1
    })
    Object.assign(exportData, res)
    formData.file_name = res.file_name
    formData.page_end = res.page_end
    formData.page_start = res.page_start
}
const handleConfirm = async () => {
    await formRef.value?.validate()
    feedback.loading('正在导出中...')
    try {
        await props.fetchFun({
            ...props.params,
            ...formData,
            page_size: props.pageSize,
            export: 2
        })
        popupRef.value?.close()
        feedback.closeLoading()
    } catch (error) {
        feedback.closeLoading()
    }
}
getData()
</script>

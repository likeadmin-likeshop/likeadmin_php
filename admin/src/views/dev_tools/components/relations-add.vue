<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            :title="popupTitle"
            :async="true"
            width="550px"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <el-form ref="formRef" :model="formData" label-width="84px" :rules="formRules">
                <el-form-item label="关联类型" prop="type">
                    <el-select class="flex-1" v-model="formData.type" placeholder="请选择关联类型">
                        <el-option
                            v-for="(item, index) in types"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="关联名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入关联名称" />
                </el-form-item>
                <el-form-item label="关联模型" prop="model">
                    <el-select class="flex-1" v-model="formData.model" placeholder="请选择关联模型">
                        <el-option
                            v-for="item in optionsData.models"
                            :label="item"
                            :value="item"
                            :key="item"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="关联健" prop="local_key">
                    <el-select
                        class="flex-1"
                        v-model="formData.local_key"
                        clearable
                        placeholder="请选择关联健"
                    >
                        <el-option
                            v-for="item in column"
                            :key="item.id"
                            :value="item.column_name"
                            :label="`${item.column_name}：${item.column_comment}`"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="外键" prop="foreign_key">
                    <el-input
                        v-model="formData.foreign_key"
                        placeholder="关联表外键或中间表的外键"
                    />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import type { PropType } from 'vue'

import { getModels } from '@/api/tools/code'
import Popup from '@/components/popup/index.vue'
import { useDictOptions } from '@/hooks/useDictOptions'

defineProps({
    column: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    types: {
        type: Array as PropType<any[]>,
        default: () => []
    }
})
const emit = defineEmits(['add', 'close', 'edit'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref<'add' | 'edit'>('add')
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑关联' : '新增关联'
})
const formData = reactive({
    name: '',
    model: '',
    type: '',
    local_key: '',
    foreign_key: ''
})

const formRules = {
    name: [
        {
            required: true,
            message: '请输入关联名称'
        }
    ],
    type: [
        {
            required: true,
            message: '请选择关联类型'
        }
    ],
    model: [
        {
            required: true,
            message: '请选择关联模型'
        }
    ],
    local_key: [
        {
            required: true,
            message: '请选择关联健'
        }
    ],
    foreign_key: [
        {
            required: true,
            message: '请输入外键'
        }
    ]
}

const { optionsData } = useDictOptions<{
    models: any[]
}>({
    models: {
        api: getModels
    }
})

const handleSubmit = async () => {
    await formRef.value?.validate()
    popupRef.value?.close()
    emit(mode.value, formData)
}

const open = (type = 'add') => {
    mode.value = type as 'add' | 'edit'
    popupRef.value?.open()
}

const setFormData = (data: Record<any, any>) => {
    for (const key in formData) {
        if (data[key] != null && data[key] != undefined) {
            //@ts-ignore
            formData[key] = data[key]
        }
    }
}

const handleClose = () => {
    emit('close')
}

defineExpose({
    open,
    setFormData
})
</script>

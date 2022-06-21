<template>
    <div class="data-table">
        <popup
            ref="popupRef"
            class="m-r-10 inline"
            :clickModalClose="false"
            :title="selectId != undefined ? '编辑字典数据' : '添加字典数据'"
            width="600px"
            :async="true"
            @confirm="handleConfirm"
            @close="handleClose"
        >
            <el-form
                class="m-r-40"
                ref="formRef"
                :model="formData"
                label-width="80px"
                size="small"
                :rules="rules"
                v-loading="loading"
            >
                <el-form-item label="字典类型">
                    <el-input v-model="query.type" disabled />
                </el-form-item>
                <el-form-item label="数据名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入数据名称" />
                </el-form-item>
                <el-form-item label="数据值" prop="value">
                    <el-input v-model="formData.value" placeholder="请输入数据值" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="formData.sort" />
                </el-form-item>
                <el-form-item label="状态" required prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="0">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="formData.remark" type="textarea" rows="4" clearable />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>

<script lang="ts" setup>

import { reactive, ref, shallowRef, watch } from 'vue'
import Popup from '@/components/popup/index.vue'
import { apiDictDataAdd, apiDictDataDetail, apiDictDataEdit } from '@/api/dict'
import { ElForm } from 'element-plus'
import { useRoute } from 'vue-router'
const props = defineProps<{
    modelValue: boolean
    selectId?: number
}>()

const emit = defineEmits<{
    (event: 'success'): void
    (event: 'update:modelValue', value: boolean): void
}>()

const popupRef = shallowRef<InstanceType<typeof Popup>>()
const formRef = shallowRef<InstanceType<typeof ElForm>>()
const { query } = useRoute()
const formData = reactive({
    name: '',
    value: '',
    sort: '',
    status: 1,
    remark: '',
    type_id: query.id
})



const rules = reactive<any>({
    name: [{
        required: true,
        message: '请输入字典名称',
        trigger: ['blur']
    }],
    value: [{
        required: true,
        message: '请输入字典类型',
        trigger: ['blur']
    }]
})

const loading = ref(false)

const getDetail = async () => {
    try {
        loading.value = true
        const data = await apiDictDataDetail({ id: props.selectId })
        loading.value = false
        Object.keys(formData).forEach(key => {
            //@ts-ignore
            formData[key] = data[key]
        })
    } catch (error) {
        loading.value = false
    }
}

const handleConfirm = async () => {
    await formRef.value?.validate()
    props.selectId ? await apiDictDataEdit({ id: props.selectId, ...formData }) : await apiDictDataAdd(formData)
    popupRef.value?.close()
    emit('success')
}

const handleClose = () => {
    formRef.value?.resetFields()
    emit('update:modelValue', false)
}


watch(() => props.modelValue, (value) => {
    if (value) {
        popupRef.value?.open()
        props.selectId && getDetail()
    } else {
        popupRef.value?.close()
    }
})

</script>

<style lang="scss" scoped>
</style>
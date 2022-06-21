<template>
    <div class="edit">
        <popup
            ref="popupRef"
            :clickModalClose="false"
            :title="popupTitle"
            width="700px"
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
                v-loading="showLoading"
            >
                <el-form-item label="数据名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入数据名称" />
                </el-form-item>
                <el-form-item label="数据值" prop="value">
                    <el-input v-model="formData.value" placeholder="请输入数据值" />
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                    <el-input v-model="formData.sort" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio
                            v-for="(item, index) in dictData.dict_status"
                            :key="index"
                            :label="item.value"
                        >{{ item.name }}</el-radio>
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

import { computed, reactive, ref, shallowRef, watch } from 'vue'
import Popup from '@/components/popup/index.vue'
import { apiDictDataLists } from '@/api/dict'
import { apiDictTypeAdd, apiDictTypeDetail, apiDictTypeEdit } from '@/api/dict'
import { ElForm } from 'element-plus'

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

// 字典数据
const dictData = reactive<Record<string, any[]>>({
    dict_status: []
})

// 获取字典数据
const getDictData = () => {
    apiDictDataLists({
        type_value: 'dict_status',
        page_type: 0
    }).then((res: any) => {
        dictData.dict_status = res.lists
    })
}


// 表单数据
const formData = reactive({
    name: '',
    value: '',
    sort: '',
    status: 1,
    remark: ''
})

// 表单验证
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

// 弹窗标题
const popupTitle = computed(() => {
    return props.selectId != undefined ? '编辑字典数据' : '添加字典数据'
})

// 是否显示loading
const showLoading = ref(false)

// 获取详情
const getDetail = async () => {
    try {
        showLoading.value = true
        const data = await apiDictTypeDetail({ id: props.selectId })
        showLoading.value = false
        Object.keys(formData).forEach(key => {
            //@ts-ignore
            formData[key] = data[key]
        })
    } catch (error) {
        showLoading.value = false
    }
}

// 提交按钮
const handleConfirm = async () => {
    await formRef.value?.validate()
    props.selectId ? await apiDictTypeEdit({ id: props.selectId, ...formData }) : await apiDictTypeAdd(formData)
    popupRef.value?.close()
    emit('success')
}

// 关闭回调
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
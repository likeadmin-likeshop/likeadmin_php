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
                <el-form-item label="上级部门" prop="pid" v-if="formData.pid !== 0">
                    <el-tree-select
                        class="flex-1"
                        v-model="formData.pid"
                        :data="optionsData.dept"
                        clearable
                        node-key="id"
                        :props="{
                            value: 'id',
                            label: 'name'
                        }"
                        check-strictly
                        :default-expand-all="true"
                        placeholder="请选择上级部门"
                    />
                </el-form-item>
                <el-form-item label="部门名称" prop="name">
                    <el-input
                        v-model="formData.name"
                        placeholder="请输入部门名称"
                        :maxlength="100"
                    />
                </el-form-item>
                <el-form-item label="负责人" prop="leader">
                    <el-input
                        v-model="formData.leader"
                        placeholder="请输入负责人姓名"
                        :maxlength="30"
                    />
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile">
                    <el-input v-model="formData.mobile" placeholder="请输入联系电话" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <div>
                        <el-input-number v-model="formData.sort" :min="0" :max="9999" />
                        <div class="form-tips">默认为0， 数值越大越排前</div>
                    </div>
                </el-form-item>
                <el-form-item label="部门状态">
                    <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'

import { deptAdd, deptAll, deptDetail, deptEdit } from '@/api/org/department'
import Popup from '@/components/popup/index.vue'
import { useDictOptions } from '@/hooks/useDictOptions'

const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref('add')
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑部门' : '新增部门'
})
const formData = reactive({
    id: '',
    pid: '' as string | number,
    name: '',
    leader: '',
    mobile: '',
    sort: 0,
    status: 1
})

const checkMobile = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback()
    } else {
        const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
            callback()
        } else {
            return callback(new Error('请输入正确的手机号'))
        }
    }
}
const formRules = {
    pid: [
        {
            required: true,
            message: '请选择上级部门',
            trigger: ['change']
        }
    ],
    name: [
        {
            required: true,
            message: '请输入部门名称',
            trigger: ['blur']
        }
    ],
    mobile: [
        {
            validator: checkMobile,
            trigger: ['blur']
        }
    ]
}

const { optionsData } = useDictOptions<{
    dept: any[]
}>({
    dept: {
        api: deptAll
    }
})

const handleSubmit = async () => {
    await formRef.value?.validate()
    mode.value == 'edit' ? await deptEdit(formData) : await deptAdd(formData)
    popupRef.value?.close()
    emit('success')
}

const open = (type = 'add') => {
    mode.value = type
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

const getDetail = async (row: Record<string, any>) => {
    const data = await deptDetail({
        id: row.id
    })
    setFormData(data)
}

const handleClose = () => {
    emit('close')
}

defineExpose({
    open,
    setFormData,
    getDetail
})
</script>

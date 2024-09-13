<template>
    <popup
        ref="popupRef"
        title="余额调整"
        width="500px"
        @confirm="handleConfirm"
        :async="true"
        @close="popupClose"
    >
        <div class="pr-8">
            <el-form ref="formRef" :model="formData" label-width="120px" :rules="formRules">
                <el-form-item label="当前余额">¥ {{ value }} </el-form-item>
                <el-form-item label="余额增减" required prop="action">
                    <el-radio-group v-model="formData.action">
                        <el-radio :value="1">增加余额</el-radio>
                        <el-radio :value="2">扣减余额</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="调整余额" prop="num">
                    <el-input
                        :model-value="formData.num"
                        placeholder="请输入调整的金额"
                        type="number"
                        @input="numberValidate"
                    />
                </el-form-item>
                <el-form-item label="调整后余额"> ¥ {{ adjustmentMoney }} </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="formData.remark" type="textarea" :rows="4" />
                </el-form-item>
            </el-form>
        </div>
    </popup>
</template>
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'

import Popup from '@/components/popup/index.vue'
import feedback from '@/utils/feedback'

const formRef = shallowRef<FormInstance>()
const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    value: {
        type: [Number, String],
        required: true
    }
})
const emit = defineEmits<{
    (event: 'update:show', value: boolean): void
    (event: 'confirm', value: any): void
}>()
const formData = reactive({
    action: 1, //变动类型 1-增加 2-减少
    num: '',
    remark: ''
})
const popupRef = shallowRef<InstanceType<typeof Popup>>()

const adjustmentMoney = computed(() => {
    return Number(props.value) + Number(formData.num) * (formData.action == 1 ? 1 : -1)
})

const formRules: FormRules = {
    num: [
        {
            required: true,
            message: '请输入调整的金额'
        }
    ]
}
const numberValidate = (value: string) => {
    if (value.includes('-')) {
        return feedback.msgError('请输入正整数')
    }
    formData.num = value
}
const handleConfirm = async () => {
    await formRef.value?.validate()
    emit('confirm', formData)
}

const popupClose = () => {
    emit('update:show', false)
    formRef.value?.resetFields()
}
watch(
    () => props.show,
    (val) => {
        if (val) {
            popupRef.value?.open()
        } else {
            popupRef.value?.close()
        }
    }
)
watch(adjustmentMoney, (val) => {
    if (val < 0) {
        feedback.msgError('调整后余额需大于0')
        formData.num = ''
    }
})
</script>

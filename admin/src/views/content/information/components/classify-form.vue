<template>
    <popup
        class="m-r-10 inline"
        ref="popupRef"
        :async="true"
        :clickModalClose="false"
        :title="btnText"
        :center="true"
        @close="handleClose(classifyFormRef)"
        @open="handleOpen"
        @confirm="onSubmit(classifyFormRef)"
        width="40vw"
    >
        <template #trigger>
            <el-button v-if="type === 'primary'" type="primary" size="small">
                {{ btnText }}
            </el-button>
            <el-button v-if="type === 'text'" type="text" size="small">{{ btnText }}</el-button>
        </template>

        <el-form
            :model="formData"
            ref="classifyFormRef"
            class="classify-form"
            :rules="rules"
            size="mini"
            label-width="90px"
        >
            <el-form-item label="资讯分类：" prop="name">
                <el-input class="ls-input" v-model="formData.name" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="排序：">
                <el-input class="ls-input" v-model="formData.sort" placeholder="请输入"></el-input>
                <div class="muted">默认排序为0，数字越大，排序越靠前</div>
            </el-form-item>

            <el-form-item label="状态：">
                <el-switch
                    v-model="formData.is_show"
                    size="small"
                    :active-text="formData.is_show ? '启用' : '关闭'"
                    :active-value="1"
                    :inactive-value="0"
                />
            </el-form-item>
        </el-form>
    </popup>
</template>

<script lang="ts" setup>
    import {
        apiArticleCategoryAdd,
        apiArticleCategoryEdit,
        apiArticleCategoryDetail,
    } from '@/api/information'
    import Popup from '@/components/popup/index.vue'
    import { ref, reactive, withDefaults, defineEmits } from 'vue'
    import type { ElForm } from 'element-plus'

    interface classifyFormObj {
        name?: string
        sort?: number
        is_show?: string | number
    }

    type FormInstance = InstanceType<typeof ElForm>
    const classifyFormRef = ref<FormInstance>()

    const props = withDefaults(
        defineProps<{
            type?: string
            id?: object | any
            btnText: string
        }>(),
        {
            type: 'add',
            id: '',
            btnText: '',
        }
    )

    const emit = defineEmits(['refresh'])

    /** Data Start **/
    const formData = ref<classifyFormObj>({
        name: '',
        sort: 0,
        is_show: '',
    })

    // 表单校验规则
    const rules = reactive({
        name: [{ required: true, message: '请输入资讯分类', trigger: 'blur' }] as any[],
    })
    const popupRef = ref<any>(null)
    /** Data End **/

    /** Methods Start **/
    // 弹窗关闭
    const handleClose = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }

    // 弹窗打开时
    const handleOpen = () => {
        if (props.id) getClassifyDetail(props.id)
    }

    // 获取分类详情
    const getClassifyDetail = async (id: number) => {
        ;(formData.value as {}) = await apiArticleCategoryDetail({ id })
    }

    // 添加分类
    const addClassify = async () => {
        await apiArticleCategoryAdd({ ...formData.value })
        emit('refresh')
    }

    // 编辑分类
    const editClassify = async () => {
        await apiArticleCategoryEdit({ ...formData.value, id: props.id })
        emit('refresh')
    }

    // 提交表单
    const onSubmit = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (!valid) return false
            if (!props.id) addClassify()
            else editClassify()
            popupRef.value.visible = false
        })
    }
    /** Methods End **/
</script>

<style lang="scss">
    .el-dialog__header {
        text-align: left;
        font-size: 16px;
        color: #101010;
    }
    .ls-input {
        width: 340px;
    }
    .classify-form {
        margin-top: 30px;
        margin-bottom: 100px;
    }
</style>

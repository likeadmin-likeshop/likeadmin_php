<template>
    <popup
        class="m-r-10 inline"
        :clickModalClose="false"
        title="编辑导航"
        :center="true"
        @close="handleClose(tabBarFormRef)"
        @open="handleOpen"
        @confirm="onSubmit(tabBarFormRef)"
        width="50vw"
    >
        <!-- Trigger Start -->
        <template #trigger>
            <el-button v-if="type === 'primary'" type="primary" size="small">
                {{ btnText }}
            </el-button>
            <el-button v-if="type === 'text'" type="text" size="small">{{ btnText }}</el-button>
        </template>
        <!-- Trigger End -->

        <!-- Form Start -->
        <el-form
            :model="tabBarForm"
            ref="tabBarFormRef"
            class="tabbar-form"
            :rules="rules"
            size="mini"
            label-width="150px"
        >
            <el-form-item label="导航名称" prop="name">
                <el-input class="ls-input" v-model="tabBarForm.name" placeholder="请输入">
                </el-input>
            </el-form-item>

            <el-form-item label="默认图表" prop="un_selected_icon">
                <material-select v-model="tabBarForm.un_selected_icon" :limit="1"></material-select>
                <div class="muted">建议尺寸：宽88*高88像素的jpg，jpeg，png，gif图片</div>
            </el-form-item>

            <el-form-item label="选中图表" prop="un_selected_icon">
                <material-select v-model="tabBarForm.selected_icon" :limit="1"></material-select>
                <div class="muted">建议尺寸：宽88*高88像素的jpg，jpeg，png，gif图片</div>
            </el-form-item>

            <el-form-item label="默认字体" prop="un_selected_icon">
                <el-input
                    class="ls-input"
                    v-model="tabBarForm.un_selected_color"
                    placeholder="请输入"
                >
                    <template #append>
                        <el-color-picker v-model="tabBarForm.un_selected_color" />
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item label="选中字体" prop="un_selected_icon">
                <el-input class="ls-input" v-model="tabBarForm.selected_color" placeholder="请输入">
                    <template #append>
                        <el-color-picker v-model="tabBarForm.selected_color" />
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <!-- Form End -->
    </popup>
</template>

<script lang="ts" setup>
    import { apiTabBarDetail, apiTabBarEdit } from '@/api/decoration'
    import Popup from '@/components/popup/index.vue'
    import { ref, reactive, withDefaults } from 'vue'
    import type { ElForm } from 'element-plus'
    import MaterialSelect from '@/components/material-select/index.vue'

    interface tabBarFormObj {
        name?: string //导航名称
        selected_icon?: string //选中图标
        un_selected_icon?: string //默认图标
        selected_color?: string //选中颜色
        un_selected_color?: string //默认颜色
    }

    type FormInstance = InstanceType<typeof ElForm>
    const tabBarFormRef = ref<FormInstance>()

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

    /** Emit Start **/
    const emit = defineEmits(['refresh'])
    /** Emit End **/

    /** Data Start **/
    const tabBarForm = ref<tabBarFormObj>({
        name: '',
        selected_icon: '',
        un_selected_icon: '',
        selected_color: '',
        un_selected_color: '',
    })
    // 表单娇艳规则
    const rules = reactive({
        name: [{ required: true, message: '请输入单位', trigger: 'blur' }] as any[],
    })
    /** Data End **/

    /** Methods Start **/
    // 弹窗关闭
    const handleClose = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
    // 弹窗打开时
    const handleOpen = () => {
        if (props.id) getTabBarDetail(props.id)
    }
    // 获取单位详情
    const getTabBarDetail = async (id: number) => {
        ;(tabBarForm.value as {}) = await apiTabBarDetail({ id })
    }
    // 编辑单位
    const tabBarEdit = async () => {
        await apiTabBarEdit({ ...tabBarForm.value, id: props.id })
        emit('refresh')
    }
    // 提交数据
    const onSubmit = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (!valid) return false
            tabBarEdit()
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
    .tabbar-form {
        margin-top: 30px;
        margin-bottom: 100px;
        .el-input-group__append {
            padding: 0;
            border: 0;
        }
    }
</style>

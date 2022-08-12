<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            :title="popupTitle"
            :async="true"
            width="550px"
            :clickModalClose="true"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <el-form ref="formRef" :model="formData" label-width="84px" :rules="formRules">
                <!-- 账号输入框 -->
                <el-form-item label="账号" prop="account">
                    <el-input
                        v-model="formData.account"
                        :disabled="formData.root == 1"
                        placeholder="请输入账号"
                    ></el-input>
                </el-form-item>
                <!-- 管理员头像 -->
                <el-form-item label="头像">
                    <div>
                        <div>
                            <material-picker v-model="formData.avatar" :limit="1" />
                        </div>
                        <div class="form-tips">建议尺寸：100*100px，支持jpg，jpeg，png格式</div>
                    </div>
                </el-form-item>

                <!-- 名称输入框 -->
                <el-form-item label="名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="归属部门" prop="dept_id">
                    <el-tree-select
                        class="flex-1"
                        v-model="formData.dept_id"
                        :data="options.dept"
                        clearable
                        node-key="id"
                        :props="{
                            value: 'id',
                            label: 'name',
                            disabled(data: any) {
                                return data.status !== 1
                            }
                        }"
                        check-strictly
                        :default-expand-all="true"
                        placeholder="请选择上级部门"
                    />
                </el-form-item>
                <el-form-item label="岗位" prop="jobs_id">
                    <el-select class="flex-1" v-model="formData.jobs_id" placeholder="请选择岗位">
                        <el-option
                            v-for="(item, index) in options.jobs"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <!-- 角色选择框 -->
                <el-form-item label="角色" prop="role_id">
                    <el-select
                        v-model="formData.role_id"
                        :disabled="formData.root == 1"
                        class="flex-1"
                        placeholder="请选择角色"
                    >
                        <el-option
                            v-if="formData.root == 1"
                            label="系统管理员"
                            :value="0"
                        ></el-option>
                        <el-option
                            v-for="(item, index) in options.role"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <!-- 密码输入框 -->
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="formData.password"
                        show-password
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>

                <!-- 确认密码输入框 -->
                <el-form-item label="确认密码" prop="password_confirm">
                    <el-input
                        v-model="formData.password_confirm"
                        show-password
                        placeholder="请输入确认密码"
                    ></el-input>
                </el-form-item>

                <!-- 管理员状态 -->
                <el-form-item label="管理员状态" v-if="formData.root != 1">
                    <el-switch v-model="formData.disable" :active-value="0" :inactive-value="1" />
                </el-form-item>

                <!-- 多处登录 -->
                <el-form-item label="多处登录">
                    <el-switch
                        v-model="formData.multipoint_login"
                        :active-value="1"
                        :inactive-value="0"
                    />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import Popup from '@/components/popup/index.vue'
import { roleLists } from '@/api/perms/role'
import { adminAdd, adminEdit } from '@/api/perms/admin'
import { deptLists } from '@/api/org/department'
import { jobsLists } from '@/api/org/post'
const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref('add')
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑管理员' : '新增管理员'
})
const formData = reactive({
    id: '',
    account: '',
    name: '',
    dept_id: '',
    jobs_id: '',
    role_id: '',
    avatar: '',
    password: '',
    password_confirm: '',
    disable: 0,
    multipoint_login: 1,
    root: 0
})

const formRules = reactive({
    account: [
        {
            required: true,
            message: '请输入账号',
            trigger: ['blur']
        }
    ],
    name: [
        {
            required: true,
            message: '请输入名称',
            trigger: ['blur']
        }
    ],
    role_id: [
        {
            required: true,
            message: '请选择角色',
            trigger: ['blur']
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: ['blur']
        }
    ] as any[],
    password_confirm: [
        {
            required: true,
            message: '请输入确认密码',
            trigger: ['blur']
        }
    ] as any[]
})
const options = reactive({
    role: [] as any[],
    dept: [] as any[],
    jobs: [] as any[]
})

const getOptions = () => {
    roleLists({
        page_type: 0
    }).then((data: any) => {
        options.role = data.lists
    })
    deptLists({
        page_type: 0
    }).then((data: any) => {
        options.dept = data
    })
    jobsLists({
        page_type: 0
    }).then((data: any) => {
        options.jobs = data.lists
    })
}

const handleSubmit = async () => {
    await formRef.value?.validate()
    mode.value == 'edit' ? await adminEdit(formData) : await adminAdd(formData)
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
    formRules.password = []
    formRules.password_confirm = []
}

const handleClose = () => {
    emit('close')
}

getOptions()

defineExpose({
    open,
    setFormData
})
</script>

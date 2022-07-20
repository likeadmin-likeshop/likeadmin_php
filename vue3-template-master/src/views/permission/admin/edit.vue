<template>
  <div class="edit-popup">
    <popup
      ref="popupRef"
      :title="popupTitle"
      :async="true"
      width="700px"
      :clickModalClose="true"
      @confirm="handleSubmit"
      @close="handleClose"
    >
      <div class="h-[400px]">
        <el-scrollbar>
          <el-form ref="formRef" :model="formData" label-width="120px" :rules="formRules">
            <!-- 账号输入框 -->
            <el-form-item label="账号" prop="account">
              <div class="w-80">
                <el-input
                  v-model="formData.account"
                  :disabled="formData.root == 1"
                  placeholder="请输入账号"
                ></el-input>
              </div>
            </el-form-item>
            <!-- 管理员头像 -->
            <el-form-item label="头像">
              <div>
                <div>
                  <material-picker v-model="formData.avatar" :limit="1"></material-picker>
                </div>
                <div class="form-tips">建议尺寸：100*100px，支持jpg，jpeg，png格式</div>
              </div>
            </el-form-item>

            <!-- 名称输入框 -->
            <el-form-item label="名称" prop="name">
              <div class="w-80">
                <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
              </div>
            </el-form-item>

            <!-- 角色选择框 -->
            <el-form-item label="角色" prop="role_id">
              <el-select
                v-model="formData.role_id"
                :disabled="formData.root == 1"
                class="w-80"
                placeholder="请选择角色"
              >
                <el-option v-if="formData.root == 1" label="超级管理员" :value="0"></el-option>
                <el-option
                  v-for="(item, index) in roleList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- 密码输入框 -->
            <el-form-item label="密码" prop="password">
              <div class="w-80">
                <el-input
                  v-model="formData.password"
                  show-password
                  placeholder="请输入密码"
                ></el-input>
              </div>
            </el-form-item>

            <!-- 确认密码输入框 -->
            <el-form-item label="确认密码" prop="password_confirm">
              <div class="w-80">
                <el-input
                  v-model="formData.password_confirm"
                  show-password
                  placeholder="请输入确认密码"
                ></el-input>
              </div>
            </el-form-item>

            <!-- 管理员状态 -->
            <el-form-item label="管理员状态">
              <div>
                <el-switch
                  v-model="formData.disable"
                  :disabled="formData.root == 1"
                  :active-value="0"
                  :inactive-value="1"
                />
                <div v-if="formData.root == 1" class="form-tips">超级管理员状态不允许关闭</div>
              </div>
            </el-form-item>

            <!-- 多处登录 -->
            <el-form-item label="支持多处登录">
              <el-switch
                v-model="formData.multipoint_login"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </popup>
  </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import Popup from '@/components/popup/index.vue'
import { roleLists } from '@/api/perms/role'
import { adminAdd, adminEdit } from '@/api/perms/admin'
const emit = defineEmits(['success'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref('add')
const popupTitle = computed(() => {
  return mode.value == 'edit' ? '编辑菜单' : '新增菜单'
})
const formData = reactive({
  account: '',
  name: '',
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
  password: [] as any[],
  password_confirm: [] as any[]
})
const roleList = ref<any[]>([])

const getRoleList = () => {
  roleLists({
    page_type: 1
  }).then((res: any) => {
    roleList.value = res.lists
  })
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  mode.value == 'edit' ? await adminEdit(formData) : await adminAdd(formData)
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
  if (mode.value == 'add') {
    formRules.password = [
      {
        required: true,
        message: '请输入密码',
        trigger: ['blur']
      }
    ]
    formRules.password_confirm = [
      {
        required: true,
        message: '请输入确认密码',
        trigger: ['blur']
      }
    ]
  }
}

const handleClose = () => {
  formRef.value?.resetFields()
}

getRoleList()

defineExpose({
  open,
  setFormData
})
</script>

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
      <div class="h-[400px]" v-loading="loading">
        <el-scrollbar>
          <el-form
            class="ls-form"
            ref="formRef"
            :rules="rules"
            :model="formData"
            label-width="120px"
            size="large"
          >
            <el-form-item label="名称" prop="name">
              <div class="w-80">
                <el-input class="ls-input" v-model="formData.name" placeholder="请输入名称" />
              </div>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
              <div class="w-80">
                <el-input
                  v-model="formData.desc"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入备注"
                />
              </div>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="formData.sort" />
            </el-form-item>
            <el-form-item label="权限" prop="menu_id">
              <div>
                <el-checkbox label="展开/折叠" @change="handleExpand" />
                <el-checkbox label="全选/不全选" @change="handleSelectAll" />
                <el-checkbox v-model="checkStrictly" label="父子联动" />
                <div>
                  <el-tree
                    ref="treeRef"
                    :data="menuTree"
                    :props="{
                      label: 'name',
                      children: 'children'
                    }"
                    :check-strictly="!checkStrictly"
                    node-key="id"
                    :default-expand-all="isExpand"
                    show-checkbox
                  />
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </popup>
  </div>
</template>
<script lang="ts" setup>
import type { CheckboxValueType, ElTree, FormInstance } from 'element-plus'
import { roleAdd, roleEdit, roleDetail } from '@/api/perms/role'
import { menuLists } from '@/api/perms/menu'
import Popup from '@/components/popup/index.vue'
import { treeToArray } from '@/utils/util'
const emit = defineEmits(['success'])
const treeRef = shallowRef<InstanceType<typeof ElTree>>()
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref('add')
const loading = ref(false)
const isExpand = ref(false)
const checkStrictly = ref(true)
const menuArray = ref<any[]>([])
const menuTree = ref<any[]>([])
const popupTitle = computed(() => {
  return mode.value == 'edit' ? '编辑菜单' : '新增菜单'
})
const formData = reactive({
  id: '',
  name: '',
  desc: '',
  sort: 0,
  menu_id: [] as any[]
})

const rules = {
  name: [
    {
      required: true,
      message: '请输入名称',
      trigger: ['blur']
    }
  ]
}

const getOptionsList = () => {
  menuLists({
    page_type: 0
  }).then((res: any) => {
    menuTree.value = res.lists
    menuArray.value = treeToArray(res.lists)
  })
}

// 获取所有选择的节点包括半选中节点
const getDeptAllCheckedKeys = () => {
  const checkedKeys = treeRef.value?.getCheckedKeys()
  const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys()!
  checkedKeys?.unshift.apply(checkedKeys, halfCheckedKeys)
  return checkedKeys
}

const setDeptAllCheckedKeys = () => {
  formData.menu_id.forEach((v) => {
    nextTick(() => {
      treeRef.value?.setChecked(v, true, false)
    })
  })
}

const handleExpand = (check: CheckboxValueType) => {
  const treeList = menuTree.value
  for (let i = 0; i < treeList.length; i++) {
    //@ts-ignore
    treeRef.value.store.nodesMap[treeList[i].id].expanded = check
  }
}

const handleSelectAll = (check: CheckboxValueType) => {
  if (check) {
    treeRef.value?.setCheckedKeys(menuArray.value.map((item) => item.id))
  } else {
    treeRef.value?.setCheckedKeys([])
  }
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  formData.menu_id = getDeptAllCheckedKeys()!
  mode.value == 'edit' ? await roleEdit(formData) : await roleAdd(formData)
  emit('success')
}

const handleClose = () => {
  formRef.value?.resetFields()
  treeRef.value?.setCheckedKeys([])
}

const open = (type = 'add') => {
  mode.value = type
  popupRef.value?.open()
}
const getDetail = async (id: number) => {
  loading.value = true
  try {
    const data = await roleDetail({ id })
    Object.keys(formData).forEach((key) => {
      //@ts-ignore
      formData[key] = data[key]
    })
    setTimeout(() => {
      setDeptAllCheckedKeys()
    }, 100)
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}
const setFormData = (data: Record<any, any>) => {
  getDetail(data.id)
}

getOptionsList()

defineExpose({
  open,
  setFormData
})
</script>

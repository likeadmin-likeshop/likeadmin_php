<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            title="分配权限"
            :async="true"
            width="550px"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <el-form
                class="ls-form"
                ref="formRef"
                :rules="rules"
                :model="formData"
                label-width="60px"
                v-loading="loading"
            >
                <el-scrollbar class="h-[400px] sm:h-[600px]">
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
                </el-scrollbar>
            </el-form>
        </popup>
    </div>
</template>
<script lang="ts" setup>
import type { CheckboxValueType, ElTree, FormInstance } from 'element-plus'

import { menuAll } from '@/api/perms/menu'
import { roleEdit } from '@/api/perms/role'
import Popup from '@/components/popup/index.vue'
import { treeToArray } from '@/utils/util'

const emit = defineEmits(['success', 'close'])
const treeRef = shallowRef<InstanceType<typeof ElTree>>()
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const isExpand = ref(false)
const checkStrictly = ref(true)
const loading = ref(false)
const menuArray = ref<any[]>([])
const menuTree = ref<any[]>([])
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

const getOptions = () => {
    loading.value = true
    menuAll().then((res: any) => {
        menuTree.value = res
        menuArray.value = treeToArray(res)
        nextTick(() => {
            setDeptAllCheckedKeys()
        })
        loading.value = false
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
    await roleEdit(formData)
    popupRef.value?.close()
    emit('success')
}

const handleClose = () => {
    emit('close')
}

const open = () => {
    popupRef.value?.open()
}

const setFormData = async (data: Record<any, any>) => {
    for (const key in formData) {
        if (data[key] != null && data[key] != undefined) {
            //@ts-ignore
            formData[key] = data[key]
        }
    }
}

getOptions()

defineExpose({
    open,
    setFormData
})
</script>

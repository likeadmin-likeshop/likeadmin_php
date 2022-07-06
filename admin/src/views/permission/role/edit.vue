<template>
    <div class="role-add">
        <el-card shadow="never">
            <el-page-header :content="getPageTitle" @back="$router.back()" />
        </el-card>
        <el-card v-loading="state.loading" shadow="never" class="m-t-16">
            <el-form
                class="ls-form"
                ref="formRef"
                :rules="state.rules"
                :model="state.formData"
                label-width="120px"
            >
                <el-form-item label="名称" prop="name">
                    <el-input class="ls-input" v-model="state.formData.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                    <el-input
                        style="width:280px;"
                        v-model="state.formData.desc"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入备注"
                    ></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="state.formData.sort" />
                </el-form-item>
                <el-form-item label="权限">
                    <div>
                        <el-checkbox label="展开/折叠" @change="handleExpand" />
                        <el-checkbox label="全选/不全选" @change="handleSelectAll" />
                        <div>
                            <el-tree
                                ref="treeRef"
                                :data="state.menuTree"
                                :props="{
                                    label: 'name',
                                    children: 'children'
                                }"
                                node-key="id"
                                :default-expand-all="state.isExpand"
                                show-checkbox
                            />
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        <footer-btns>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
        </footer-btns>
    </div>
</template>
<script lang="ts" setup>
import { shallowRef, ref, toRefs, reactive, computed, nextTick } from 'vue'
import type { ElTree, FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { apiRoleAdd, apiRoleDetail, apiMenuLists, apiRoleEdit } from '@/api/auth'
import { treeToArray } from '@/utils/util'
const formRef = shallowRef<FormInstance>()
const treeRef = shallowRef<InstanceType<typeof ElTree>>()
const { query } = useRoute()
const router = useRouter()
const state = reactive({
    loading: false,
    isExpand: false,
    menuArray: [] as any[],
    menuTree: [],
    formData: {
        name: '',
        desc: '',
        sort: 0,
        menu_id: [] as any[]
    },
    rules: {
        name: [
            {
                required: true,
                message: '请输入名称',
                trigger: ['blur']
            }
        ]
    }
})
const getPageTitle = computed(() => {
    return query.id ? '编辑角色' : '新增角色'
})
const getOptionsList = () => {
    apiMenuLists({
        page_type: 1
    }).then((res: any) => {
        state.menuTree = res.lists
        state.menuArray = treeToArray(res.lists)
    })
}

const getDetail = async () => {
    if (!query.id) {
        return
    }
    state.loading = true
    try {
        const data = await apiRoleDetail({ id: query.id })
        Object.keys(state.formData).forEach((key) => {
            //@ts-ignore
            state.formData[key] = data[key]
        })
        nextTick(() => setDeptAllCheckedKeys())
        state.loading = false
    } catch (error) {
        state.loading = false
    }
}

// 获取所有选择的节点包括半选中节点
const getDeptAllCheckedKeys = () => {
    const checkedKeys = treeRef.value?.getCheckedKeys()
    const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys()!
    checkedKeys?.unshift.apply(checkedKeys, halfCheckedKeys)
    return checkedKeys
}

const setDeptAllCheckedKeys = () => {
    state.formData.menu_id.forEach((v) => {
        nextTick(() => {
            treeRef.value?.setChecked(v, true, false)
        })
    })
}

const handleExpand = (check: boolean) => {
    const treeList = state.menuTree
    for (let i = 0; i < treeList.length; i++) {
        //@ts-ignore
        treeRef.value.store.nodesMap[treeList[i].id].expanded = check
    }
}

const handleSelectAll = (check: boolean) => {
    if (check) {
        treeRef.value?.setCheckedKeys(state.menuArray.map((item) => item.id))
    } else {
        treeRef.value?.setCheckedKeys([])
    }
}

const handleSubmit = async () => {
    const id = query.id
    await formRef.value?.validate()
    state.formData.menu_id = getDeptAllCheckedKeys()!
    id ? await apiRoleEdit({ id, ...state.formData }) : await apiRoleAdd(state.formData)
    router.back()
}
getOptionsList()
getDetail()
</script>
  
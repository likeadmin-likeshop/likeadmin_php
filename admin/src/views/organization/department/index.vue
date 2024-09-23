<template>
    <div class="department">
        <el-card class="!border-none" shadow="never">
            <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
                <el-form-item class="w-[280px]" label="部门名称" prop="name">
                    <el-input
                        v-model="queryParams.name"
                        placeholder="输入部门名称"
                        clearable
                        @keyup.enter="getLists"
                    />
                </el-form-item>
                <el-form-item class="w-[280px]" label="部门状态" prop="status">
                    <el-select v-model="queryParams.status">
                        <el-option label="全部" value />
                        <el-option label="正常" value="1" />
                        <el-option label="停用" value="0" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getLists">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none mt-4" shadow="never">
            <div>
                <el-button v-perms="['dept.dept/add']" type="primary" @click="handleAdd()">
                    <template #icon>
                        <icon name="el-icon-Plus" />
                    </template>
                    新增
                </el-button>
                <el-button @click="handleExpand"> 展开/折叠 </el-button>
            </div>
            <el-table
                ref="tableRef"
                class="mt-4"
                size="large"
                v-loading="loading"
                :data="lists"
                row-key="id"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <el-table-column
                    label="部门名称"
                    prop="name"
                    min-width="150"
                    show-overflow-tooltip
                />
                <el-table-column label="部门状态" prop="status" min-width="100">
                    <template #default="{ row }">
                        <el-tag class="ml-2" :type="row.status ? 'primary' : 'danger'">{{
                            row.status_desc
                        }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="排序" prop="sort" min-width="100" />
                <el-table-column label="更新时间" prop="update_time" min-width="180" />
                <el-table-column label="操作" width="160" fixed="right">
                    <template #default="{ row }">
                        <el-button
                            v-perms="['dept.dept/add']"
                            type="primary"
                            link
                            @click="handleAdd(row.id)"
                        >
                            新增
                        </el-button>
                        <el-button
                            v-perms="['dept.dept/edit']"
                            type="primary"
                            link
                            @click="handleEdit(row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            v-if="row.pid !== 0"
                            v-perms="['dept.dept/delete']"
                            type="danger"
                            link
                            @click="handleDelete(row.id)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <edit-popup v-if="showEdit" ref="editRef" @success="getLists" @close="showEdit = false" />
    </div>
</template>
<script lang="ts" setup name="department">
import type { ElTable, FormInstance } from 'element-plus'

import { deptDelete, deptLists } from '@/api/org/department'
import feedback from '@/utils/feedback'

import EditPopup from './edit.vue'

const tableRef = shallowRef<InstanceType<typeof ElTable>>()
const editRef = shallowRef<InstanceType<typeof EditPopup>>()
const formRef = shallowRef<FormInstance>()
let isExpand = false
const loading = ref(false)
const lists = ref<any[]>([])
const queryParams = reactive({
    status: '',
    name: ''
})
const showEdit = ref(false)
const getLists = async () => {
    loading.value = true
    lists.value = await deptLists(queryParams)
    loading.value = false
}

const resetParams = () => {
    formRef.value?.resetFields()
    getLists()
}

const handleAdd = async (id?: number) => {
    showEdit.value = true
    await nextTick()
    if (id) {
        editRef.value?.setFormData({
            pid: id
        })
    }
    editRef.value?.open('add')
}

const handleEdit = async (data: any) => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('edit')
    editRef.value?.getDetail(data)
}

const handleDelete = async (id: number) => {
    await feedback.confirm('确定要删除？')
    await deptDelete({ id })
    getLists()
}

const handleExpand = () => {
    isExpand = !isExpand
    toggleExpand(lists.value, isExpand)
}

const toggleExpand = (children: any[], unfold = true) => {
    for (const key in children) {
        tableRef.value?.toggleRowExpansion(children[key], unfold)
        if (children[key].children) {
            toggleExpand(children[key].children!, unfold)
        }
    }
}

onMounted(async () => {
    await getLists()
    nextTick(() => {
        handleExpand()
    })
})
</script>

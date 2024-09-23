<template>
    <div class="admin">
        <el-card class="!border-none" shadow="never">
            <el-form class="mb-[-16px]" :model="formData" inline>
                <el-form-item class="w-[280px]" label="管理员账号">
                    <el-input
                        v-model="formData.account"
                        placeholder="请输入管理员账号"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item class="w-[280px]" label="管理员名称">
                    <el-input
                        v-model="formData.name"
                        placeholder="请输入管理员名称"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item class="w-[280px]" label="管理员角色">
                    <el-select v-model="formData.role_id">
                        <el-option label="全部" value="" />
                        <el-option
                            v-for="(item, index) in optionsData.role"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                    <export-data
                        class="ml-2.5"
                        :fetch-fun="adminLists"
                        :params="formData"
                        :page-size="pager.size"
                    />
                </el-form-item>
            </el-form>
        </el-card>
        <el-card v-loading="pager.loading" class="mt-4 !border-none" shadow="never">
            <el-button v-perms="['auth.admin/add']" type="primary" @click="handleAdd">
                <template #icon>
                    <icon name="el-icon-Plus" />
                </template>
                新增
            </el-button>
            <div class="mt-4">
                <el-table :data="pager.lists" size="large">
                    <el-table-column label="ID" prop="id" min-width="60" />>
                    <el-table-column label="头像" min-width="100">
                        <template #default="{ row }">
                            <el-avatar :size="50" :src="row.avatar"></el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column label="账号" prop="account" min-width="100" />
                    <el-table-column label="名称" prop="name" min-width="100" />
                    <el-table-column
                        label="角色"
                        prop="role_name"
                        min-width="100"
                        show-tooltip-when-overflow
                    />
                    <el-table-column
                        label="部门"
                        prop="dept_name"
                        min-width="100"
                        show-tooltip-when-overflow
                    />
                    <el-table-column label="创建时间" prop="create_time" min-width="180" />
                    <el-table-column label="最近登录时间" prop="login_time" min-width="180" />
                    <el-table-column label="最近登录IP" prop="login_ip" min-width="120" />
                    <el-table-column label="状态" min-width="100" v-perms="['auth.admin/edit']">
                        <template #default="{ row }">
                            <el-switch
                                v-if="row.root != 1"
                                v-model="row.disable"
                                :active-value="0"
                                :inactive-value="1"
                                @change="changeStatus(row)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
                            <el-button
                                v-perms="['auth.admin/edit']"
                                type="primary"
                                link
                                @click="handleEdit(row)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                v-if="row.root != 1"
                                v-perms="['auth.admin/delete']"
                                type="danger"
                                link
                                @click="handleDelete(row.id)"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="flex mt-4 justify-end">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
        <edit-popup v-if="showEdit" ref="editRef" @success="getLists" @close="showEdit = false" />
    </div>
</template>

<script lang="ts" setup name="admin">
import { adminDelete, adminEdit, adminLists } from '@/api/perms/admin'
import { roleAll } from '@/api/perms/role'
import { useDictOptions } from '@/hooks/useDictOptions'
import { usePaging } from '@/hooks/usePaging'
import feedback from '@/utils/feedback'

import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 表单数据
const formData = reactive({
    account: '',
    name: '',
    role_id: ''
})
const showEdit = ref(false)
const { pager, getLists, resetParams, resetPage } = usePaging({
    fetchFun: adminLists,
    params: formData
})

const changeStatus = (data: any) => {
    adminEdit({
        id: data.id,
        avatar: data.avatar,
        account: data.account,
        name: data.name,
        role_id: data.role_id,
        job_id: data.job_id,
        dept_id: data.dept_id,
        disable: data.disable,
        multipoint_login: data.multipoint_login
    }).finally(() => {
        getLists()
    })
}
const handleAdd = async () => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('add')
}

const handleEdit = async (data: any) => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('edit')
    editRef.value?.setFormData(data)
}

const handleDelete = async (id: number) => {
    await feedback.confirm('确定要删除？')
    await adminDelete({ id })
    getLists()
}

const { optionsData } = useDictOptions<{
    role: any[]
}>({
    role: {
        api: roleAll
    }
})

onMounted(() => {
    getLists()
})
</script>

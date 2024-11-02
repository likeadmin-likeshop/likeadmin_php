<template>
    <div class="dict-type">
        <el-card class="!border-none" shadow="never">
            <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" inline>
                <el-form-item class="w-[280px]" label="字典名称">
                    <el-input v-model="queryParams.name" clearable @keyup.enter="resetPage" />
                </el-form-item>
                <el-form-item class="w-[280px]" label="字典类型">
                    <el-input v-model="queryParams.type" clearable @keyup.enter="resetPage" />
                </el-form-item>
                <el-form-item class="w-[280px]" label="状态">
                    <el-select v-model="queryParams.status">
                        <el-option label="全部" value />
                        <el-option label="正常" :value="1" />
                        <el-option label="停用" :value="0" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none mt-4" shadow="never">
            <div>
                <el-button
                    v-perms="['setting.dict.dict_type/add']"
                    type="primary"
                    @click="handleAdd"
                >
                    <template #icon>
                        <icon name="el-icon-Plus" />
                    </template>
                    新增
                </el-button>
                <el-button
                    v-perms="['setting.dict.dict_type/delete']"
                    :disabled="!selectData.length"
                    type="danger"
                    @click="handleDelete(selectData)"
                >
                    <template #icon>
                        <icon name="el-icon-Delete" />
                    </template>
                    删除
                </el-button>
            </div>
            <div class="mt-4" v-loading="pager.loading">
                <div>
                    <el-table
                        :data="pager.lists"
                        size="large"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="55" />
                        <el-table-column label="ID" prop="id" />
                        <el-table-column label="字典名称" prop="name" min-width="120" />
                        <el-table-column label="字典类型" prop="type" min-width="120" />
                        <el-table-column label="状态">
                            <template v-slot="{ row }">
                                <el-tag v-if="row.status == 1">正常</el-tag>
                                <el-tag v-else type="danger">停用</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" prop="remark" show-tooltip-when-overflow />
                        <el-table-column label="创建时间" prop="create_time" min-width="180" />
                        <el-table-column label="操作" width="190" fixed="right">
                            <template #default="{ row }">
                                <el-button
                                    v-perms="['setting.dict.dict_type/edit']"
                                    link
                                    type="primary"
                                    @click="handleEdit(row)"
                                >
                                    编辑
                                </el-button>
                                <el-button
                                    v-perms="['setting.dict.dict_data/lists']"
                                    type="primary"
                                    link
                                >
                                    <router-link
                                        :to="{
                                            path: getRoutePath('setting.dict.dict_data/lists'),
                                            query: {
                                                id: row.id
                                            }
                                        }"
                                    >
                                        数据管理
                                    </router-link>
                                </el-button>
                                <el-button
                                    v-perms="['setting.dict.dict_type/delete']"
                                    link
                                    type="danger"
                                    @click="handleDelete(row.id)"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="flex justify-end mt-4">
                    <pagination v-model="pager" @change="getLists" />
                </div>
            </div>
        </el-card>
        <edit-popup v-if="showEdit" ref="editRef" @success="getLists" @close="showEdit = false" />
    </div>
</template>

<script lang="ts" setup name="dictType">
import { dictTypeDelete, dictTypeLists } from '@/api/setting/dict'
import { usePaging } from '@/hooks/usePaging'
import { getRoutePath } from '@/router'
import feedback from '@/utils/feedback'

import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
const showEdit = ref(false)
const queryParams = reactive({
    name: '',
    type: '',
    status: ''
})

const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: dictTypeLists,
    params: queryParams
})

const selectData = ref<any[]>([])

const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ id }) => id)
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

// 删除角色
const handleDelete = async (id: any[] | number) => {
    await feedback.confirm('确定要删除？')
    await dictTypeDelete({ id })
    getLists()
}

getLists()
</script>

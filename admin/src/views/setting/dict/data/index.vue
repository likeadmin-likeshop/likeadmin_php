<template>
    <div class="dict-type">
        <el-card class="!border-none" shadow="never">
            <el-page-header class="mb-4" content="数据管理" @back="$router.back()" />
            <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" inline>
                <el-form-item class="w-[280px]" label="字典名称">
                    <el-select v-model="queryParams.type_id" @change="getLists">
                        <el-option
                            v-for="item in optionsData.dict_type"
                            :label="item.name"
                            :value="item.id"
                            :key="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item class="w-[280px]" label="数据名称">
                    <el-input v-model="queryParams.name" clearable @keyup.enter="resetPage" />
                </el-form-item>
                <el-form-item class="w-[280px]" label="数据状态">
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
                    v-perms="['setting.dict.dict_data/add']"
                    type="primary"
                    @click="handleAdd"
                >
                    <template #icon>
                        <icon name="el-icon-Plus" />
                    </template>
                    添加数据
                </el-button>
                <el-button
                    v-perms="['setting.dict.dict_data/delete']"
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
                        <el-table-column label="数据名称" prop="name" min-width="120" />
                        <el-table-column label="数据值" prop="value" min-width="120" />
                        <el-table-column label="状态">
                            <template v-slot="{ row }">
                                <el-tag v-if="row.status == 1">正常</el-tag>
                                <el-tag v-else type="danger">停用</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="备注"
                            prop="remark"
                            min-width="120"
                            show-tooltip-when-overflow
                        />
                        <el-table-column label="排序" prop="sort" />
                        <el-table-column label="操作" width="120" fixed="right">
                            <template #default="{ row }">
                                <el-button
                                    v-perms="['setting.dict.dict_data/edit']"
                                    link
                                    type="primary"
                                    @click="handleEdit(row)"
                                >
                                    编辑
                                </el-button>
                                <el-button
                                    v-perms="['setting.dict.dict_data/delete']"
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

<script lang="ts" setup name="dictData">
import { dictDataDelete, dictDataLists, dictTypeLists } from '@/api/setting/dict'
import { usePaging } from '@/hooks/usePaging'
import feedback from '@/utils/feedback'

import EditPopup from './edit.vue'

const { query } = useRoute()
const showEdit = ref(false)
const editRef = shallowRef<InstanceType<typeof EditPopup>>()

const queryParams = reactive({
    type: '',
    type_id: Number(query.id),
    name: '',
    status: ''
})

const optionsData = reactive<{
    dict_type: any[]
}>({
    dict_type: []
})

const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: dictDataLists,
    params: queryParams
})

const selectData = ref<any[]>([])

const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ id }) => id)
}

const handleAdd = async () => {
    showEdit.value = true
    await nextTick()
    const type = optionsData.dict_type.find((item) => item.id == queryParams.type_id)
    editRef.value?.setFormData({
        type_value: type?.type,
        type_id: type.id
    })
    editRef.value?.open('add')
}

const handleEdit = async (data: any) => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('edit')
    editRef.value?.setFormData(data)
}

const handleDelete = async (id: any[] | number) => {
    await feedback.confirm('确定要删除？')
    await dictDataDelete({ id })
    getLists()
}

const getDictType = async () => {
    const data = await dictTypeLists({ page_type: 0 })
    optionsData.dict_type = data.lists
}

getLists()
getDictType()
</script>

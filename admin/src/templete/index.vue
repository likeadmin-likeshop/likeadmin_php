<template>
    <div>
        <el-card shadow="never">
            <el-form class="ls-form" :model="queryParams" label-width="80px" inline>
                <el-form-item label="字典名称">
                    <el-input v-model="queryParams.name" class="ls-input" />
                </el-form-item>
                <el-form-item label="字典类型">
                    <el-input v-model="queryParams.type" class="ls-input" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="queryParams.status">
                        <el-option label="全部" value />
                        <el-option
                            v-for="(item, index) in dictData.dict_status"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <div class="m-l-20">
                        <el-button type="primary" @click="resetPage">查询</el-button>
                        <el-button @click="resetParams">重置</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="m-t-16" v-loading="pager.loading" shadow="never">
            <el-button type="primary" @click="handleAdd">新增字典类型</el-button>
            <popup
                class="m-l-10 inline"
                :disabled="!selectData.length"
                content="确认删除选中字典？"
                @confirm="handleDelete(selectData)"
            >
                <template #trigger>
                    <el-button :disabled="!selectData.length">删除</el-button>
                </template>
            </popup>
            <div class="m-t-15">
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="ID" prop="id" />
                    <el-table-column label="字典名称" prop="name" />
                    <el-table-column label="字典类型" prop="type" />
                    <el-table-column label="状态">
                        <template v-slot="{ row }">
                            <el-tag v-if="row.status == 1">正常</el-tag>
                            <el-tag v-else type="danger">停用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" prop="remark" />
                    <el-table-column label="创建时间" prop="create_time" />
                    <el-table-column label="操作" width="200" fixed="right">
                        <template #default="{ row }">
                            <el-button type="text" @click="handleEdit(row.id)">编辑</el-button>
                            <popup class="inline m-l-10" @confirm="handleDelete(row.id)">
                                <template #trigger>
                                    <el-button type="text">删除</el-button>
                                </template>
                            </popup>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="flex row-right">
                <pagination
                    v-model="pager"
                    layout="total, prev, pager, next, jumper"
                    @change="requestApi"
                />
            </div>
        </el-card>
        <edit v-model="showEdit" :select-id="selectId" @success="requestApi" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { usePages } from '@/core/hooks/pages'
import { apiDictDataLists } from '@/api/dict'
import { apiDictTypeLists, apiDictTypeDelete } from '@/api/dict'
import Edit from './edit.vue'
import { timeFormat } from '@/utils/util'
// 编辑时的id
const selectId = ref<number>()

// 是否显示编辑框
const showEdit = ref(false)

// 查询条件
const queryParams = reactive({
    type: '',
    name: '',
    status: ''
})

// 选中数据
const selectData = ref<any[]>([])

// 表格选择后回调事件
const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ id }) => id)
}

// 字典数据
const dictData = reactive<Record<string, any[]>>({
    dict_status: []
})

// 获取字典数据
const getDictData = () => {
    apiDictDataLists({
        type_value: 'dict_status',
        page_type: 0
    }).then((res: any) => {
        dictData.dict_status = res.lists
    })
}

// 分页相关
const { pager, requestApi, resetParams, resetPage } = usePages({
    callback: apiDictTypeLists,
    params: queryParams
})

// 添加
const handleAdd = () => {
    showEdit.value = true
    selectId.value = undefined
}

// 编辑
const handleEdit = (id: number) => {
    showEdit.value = true
    selectId.value = id
}

// 删除
const handleDelete = async (id: number | any[]) => {
    await apiDictTypeDelete({ id })
    requestApi()
}

requestApi()
getDictData()
</script>

<style lang="scss" scoped>
.ls-form {
    margin-bottom: -16px;
}
</style>

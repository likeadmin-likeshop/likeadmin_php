<template>
    <div class="dict">
        <el-card shadow="never">
            <el-form class="ls-form" :model="formData" label-width="80px" inline>
                <el-form-item label="字典名称">
                    <el-input v-model="formData.name" class="ls-input" />
                </el-form-item>
                <el-form-item label="字典类型">
                    <el-input v-model="formData.type" class="ls-input" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formData.status">
                        <el-option label="全部" value />
                        <el-option label="正常" :value="1" />
                        <el-option label="停用" :value="0" />
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
            <el-button type="primary" @click="handelShowEdit(true)">新增字典类型</el-button>
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
                            <el-button type="text" @click="handelShowEdit(true, row.id)">编辑</el-button>
                            <router-link
                                class="m-l-10"
                                :to="{
                                    path: '/setting/dict/data',
                                    query: {
                                        id: row.id,
                                        type: row.type
                                    }
                                }"
                            >
                                <el-button type="text">数据管理</el-button>
                            </router-link>
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
        <dict-type-edit v-model="showEdit" :select-id="selectId" @success="requestApi" />
    </div>
</template>

<script lang="ts" setup>
import { apiDictTypeDelete, apiDictTypeLists, } from '@/api/dict'
import { usePages } from '@/core/hooks/pages'
import { reactive, ref } from 'vue'
import Pagination from '@/components/pagination/index.vue'
import Popup from '@/components/popup/index.vue'
import DictTypeEdit from './components/dict-type-edit.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formData = reactive({
    name: '',
    type: '',
    status: ''
})

const selectId = ref<number>()
const showEdit = ref(false)

const { pager, requestApi, resetParams, resetPage } = usePages({
    callback: apiDictTypeLists,
    params: formData
})

const selectData = ref<any[]>([])

const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ id }) => id)
}

const handelShowEdit = (show: boolean, id?: number) => {
    showEdit.value = show
    selectId.value = id
}

const handleDelete = async (id: any[] | number) => {
    await apiDictTypeDelete({ id })
    requestApi()
}

requestApi()

</script>

<style lang="scss" scoped>
.ls-form {
    margin-bottom: -16px;
}
</style>

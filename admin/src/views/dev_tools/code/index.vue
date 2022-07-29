<template>
    <div class="code-generation">
        <el-card class="!border-none" shadow="never">
            <el-form class="mb-[-16px]" :model="formData" inline>
                <el-form-item label="表名称">
                    <el-input v-model="formData.table_name" />
                </el-form-item>
                <el-form-item label="表描述">
                    <el-input v-model="formData.table_comment" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none mt-4" shadow="never" v-loading="pager.loading">
            <div class="flex">
                <data-table
                    v-perms="['tools.generator/selectTable']"
                    class="inline-block mr-[10px]"
                    @success="getLists"
                >
                    <el-button type="primary">
                        <template #icon>
                            <icon name="el-icon-Plus" />
                        </template>
                        导入数据表
                    </el-button>
                </data-table>
                <el-button
                    v-perms="['tools.generator/delete']"
                    :disabled="!selectData.length"
                    @click="handleDelete(selectData)"
                    type="danger"
                >
                    <template #icon>
                        <icon name="el-icon-Delete" />
                    </template>
                    删除
                </el-button>
                <el-button
                    v-perms="['tools.generator/generate']"
                    :disabled="!selectData.length"
                    @click="handleGenerate(selectData)"
                >
                    生成代码
                </el-button>
            </div>
            <div class="mt-4">
                <el-table
                    :data="pager.lists"
                    size="large"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="表名称" prop="table_name" min-width="180" />
                    <el-table-column label="表描述" prop="table_comment" min-width="180" />
                    <el-table-column label="创建时间" prop="create_time" min-width="180" />
                    <el-table-column label="更新时间" prop="update_time" min-width="180" />
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <el-button
                                    v-perms="['tools.generator/preview']"
                                    type="primary"
                                    link
                                    @click="handlePreview(row.id)"
                                >
                                    预览
                                </el-button>
                                <el-dropdown class="ml-1">
                                    <el-button type="primary" link>
                                        更多
                                        <icon name="el-icon-ArrowDown" :size="14" />
                                    </el-button>

                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <router-link
                                                v-perms="['tools.generator/edit']"
                                                :to="{
                                                    path: '/dev_tools/code/edit',
                                                    query: {
                                                        id: row.id
                                                    }
                                                }"
                                            >
                                                <el-dropdown-item>
                                                    <el-button type="primary" link>
                                                        编辑
                                                    </el-button>
                                                </el-dropdown-item>
                                            </router-link>
                                            <div
                                                v-perms="['tools.generator/generate']"
                                                @click="handleGenerate(row.id)"
                                            >
                                                <el-dropdown-item>
                                                    <el-button type="primary" link>
                                                        代码生成
                                                    </el-button>
                                                </el-dropdown-item>
                                            </div>

                                            <el-dropdown-item
                                                v-perms="['tools.generator/syncColumn']"
                                            >
                                                <el-button
                                                    type="primary"
                                                    link
                                                    @click="handleSync(row.id)"
                                                >
                                                    同步
                                                </el-button>
                                            </el-dropdown-item>
                                            <el-dropdown-item v-perms="['tools.generator/delete']">
                                                <el-button
                                                    type="danger"
                                                    link
                                                    @click="handleDelete(row.id)"
                                                >
                                                    删除
                                                </el-button>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="flex justify-end mt-4">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
        <code-preview
            v-if="previewState.show"
            v-model="previewState.show"
            :code="previewState.code"
        />
    </div>
</template>

<script lang="ts" setup>
import {
    generateTable,
    syncColumn,
    generateDelete,
    generatePreview,
    generateCode
} from '@/api/tools/code'
import { usePaging } from '@/hooks/paging'
import DataTable from '../components/data-table.vue'
import CodePreview from '../components/code-preview.vue'
import feedback from '@/utils/feedback'

const formData = reactive({
    table_name: '',
    table_comment: ''
})

const previewState = reactive({
    show: false,
    loading: false,
    code: []
})

const { pager, getLists, resetParams, resetPage } = usePaging({
    fetchFun: generateTable,
    params: formData
})

const selectData = ref<any[]>([])

const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ id }) => id)
}

const handleSync = async (id: number) => {
    await feedback.confirm('确认要同步表结构？')
    await syncColumn({ id })
}

const handleDelete = async (id: number | any[]) => {
    await feedback.confirm('确定要删除？')
    await generateDelete({ id })
    getLists()
}

const handlePreview = async (id: number) => {
    const data: any = await generatePreview({ id })
    previewState.code = data
    previewState.show = true
}

const handleGenerate = async (id: number | number[]) => {
    const data: any = await generateCode({ id })
    if (data.file) {
        window.open(data.file, '_blank')
    }
}

getLists()
</script>

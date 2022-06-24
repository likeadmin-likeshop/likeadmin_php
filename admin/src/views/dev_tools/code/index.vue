<template>
    <div class="code-generation">
        <el-card shadow="never">
            <el-form class="ls-form" :model="formData" label-width="80px" size="small" inline>
                <el-form-item label="表名称">
                    <el-input v-model="formData.table_name" class="ls-input" />
                </el-form-item>
                <el-form-item label="表描述">
                    <el-input v-model="formData.table_comment" class="ls-input" />
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
            <data-table class="inline m-r-10" @success="requestApi">
                <el-button type="primary" size="small">导入数据表</el-button>
            </data-table>
            <el-button
                size="small"
                :disabled="!selectData.length"
                @click="handleGenerate(selectData)"
            >生成代码</el-button>
            <popup
                class="m-l-10 inline"
                :disabled="!selectData.length"
                content="确认删除选中数据表？"
                @confirm="handleDelete(selectData)"
            >
                <template #trigger>
                    <el-button size="small" :disabled="!selectData.length">删除</el-button>
                </template>
            </popup>
            <div class="m-t-15">
                <el-table
                    :data="pager.lists"
                    size="small"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="表名称" prop="table_name" />
                    <el-table-column label="表描述" prop="table_comment" />
                    <el-table-column label="创建时间" prop="create_time" />
                    <el-table-column label="更新时间" prop="update_time" />
                    <el-table-column label="操作" width="240" fixed="right">
                        <template #default="{ row }">
                            <el-button type="text" @click="handlePreview(row.id)">预览</el-button>
                            <el-button type="text" @click="handleGenerate(row.id)">代码生成</el-button>
                            <router-link
                                class="m-l-10"
                                :to="{
                                    path: '/dev_tools/code/edit',
                                    query: {
                                        id: row.id
                                    }
                                }"
                            >
                                <el-button type="text">编辑</el-button>
                            </router-link>
                            <popup
                                class="inline m-l-10"
                                content="确认要同步表结构吗？"
                                @confirm="handleSync(row.id)"
                            >
                                <template #trigger>
                                    <el-button type="text">同步</el-button>
                                </template>
                            </popup>
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
        <code-preview v-if="codePreview.show" v-model="codePreview.show" :code="codePreview.code" />
    </div>
</template>

<script lang="ts" setup>
import { apiGenerateTable, apiSyncColumn, apiGenerateDel, apiGeneratePreview, apiGenerateCode, apiGenerateDownload } from '@/api/dev_tools'
import { usePages } from '@/core/hooks/pages'
import { reactive, ref } from 'vue'
import DataTable from '../components/data-table.vue'
import Pagination from '@/components/pagination/index.vue'
import CodePreview from '../components/code-preview.vue'
import Popup from '@/components/popup/index.vue'
import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'

const router = useRouter()
const formData = reactive({
    table_name: '',
    table_comment: ''
})

const codePreview = reactive({
    show: false,
    code: []
})

const { pager, requestApi, resetParams, resetPage } = usePages({
    callback: apiGenerateTable,
    params: formData
})

const selectData = ref<any[]>([])

const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ id }) => id)
}


const handleSync = async (id: number) => {
    await apiSyncColumn({ id })
}

const handleDelete = async (id: number | any[]) => {
    await apiGenerateDel({ id })
    requestApi()
}

const handlePreview = async (id: number) => {
    const loadingInstance = ElLoading.service({
        text: '正在生成中...'
    })
    try {

        const data: any = await apiGeneratePreview({ id })
        codePreview.show = true
        codePreview.code = data
        loadingInstance.close()
    } catch (error) {
        loadingInstance.close()
    }


}

const handleGenerate = async (id: number | number[]) => {
    const data: any = await apiGenerateCode({ id })
    if (data.file) {
        window.open(data.file, '_blank')
    }

}


requestApi()

</script>

<style lang="scss" scoped>
.ls-form {
    margin-bottom: -16px;
}
</style>

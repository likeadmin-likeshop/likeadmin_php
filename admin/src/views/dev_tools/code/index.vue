<template>
    <div class="code-generation">
        <el-card v-loading="pager.loading" shadow="never">
            <data-table class="inline">
                <el-button type="primary" size="small">导入数据表</el-button>
            </data-table>
            <el-button size="small">生成代码</el-button>
            <el-button size="small">删除</el-button>
            <div class="m-t-15">
                <el-table :data="pager.lists" size="small">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="表名称" prop="table_name" />
                    <el-table-column label="表描述" prop="table_comment" />
                    <el-table-column label="创建时间" prop="create_time" />
                    <el-table-column label="更新时间" prop="update_time" />
                    <el-table-column label="操作" width="200" fixed="right">
                        <template #default="{ row }">
                            <el-button type="text">预览</el-button>
                            <el-button type="text">代码生成</el-button>
                            <el-dropdown class="m-l-10">
                                <el-button type="text">
                                    更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>编辑</el-dropdown-item>
                                        <el-dropdown-item>同步</el-dropdown-item>
                                        <el-dropdown-item>删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
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
    </div>
</template>

<script lang="ts" setup>
import {  apiGenerateTable } from '@/api/dev_tools';
import { usePages } from '@/core/hooks/pages';
import { reactive } from 'vue' 
import DataTable from '../components/data-table.vue'
import Pagination from '@/components/pagination/index.vue'
const { pager, requestApi, resetParams, resetPage } = usePages({
    callback: apiGenerateTable
})

requestApi()

</script>

<style lang="scss" scoped>
.ls-form {
    margin-bottom: -16px;
}
</style>

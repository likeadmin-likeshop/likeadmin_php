<template>
    <div class="category">
        <el-card class="m-t-15" shadow="never" v-loading="pager.loading">
            <classify-form
                @refresh="requestApi"
                type="primary"
                btnText="新增资讯分类"
            ></classify-form>

            <div>
                <el-table class="m-t-20" :data="pager.lists">
                    <el-table-column label="ID" prop="id" min-width="30"></el-table-column>
                    <el-table-column label="资讯分类名称" prop="name"> </el-table-column>
                    <el-table-column label="排序" prop="sort"></el-table-column>
                    <el-table-column label="状态" prop="is_show_desc"> </el-table-column>
                    <el-table-column label="添加时间" prop="create_time"> </el-table-column>
                    <el-table-column label="操作" width="150" fixed="right">
                        <template #default="scope">
                            <classify-form
                                :id="scope.row.id"
                                type="text"
                                btnText="编辑"
                                @refresh="requestApi"
                            ></classify-form>

                            <popup
                                class="m-r-10 inline"
                                @confirm="handleStatusChange(scope.row.is_show, scope.row.id)"
                            >
                                <template #trigger>
                                    <el-button type="text">
                                        {{ scope.row.is_show ? '停用' : '启用' }}
                                    </el-button>
                                </template>
                                {{
                                    scope.row.is_show
                                        ? '确定要停用资讯分类吗?'
                                        : '确定要启用资讯分类吗?'
                                }}
                            </popup>

                            <popup class="m-r-10 inline" @confirm="handleDelete(scope.row.id)">
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
                    @change="requestApi"
                    layout="total, prev, pager, next, jumper"
                />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
    import {
        apiArticleCategoryList,
        apiArticleCategoryDelete,
        apiArticleCategoryStatus,
    } from '@/api/information'
    import { onMounted, reactive, ref } from 'vue'
    import type { ElTable } from 'element-plus'
    import Pagination from '@/components/pagination/index.vue'
    import Popup from '@/components/Popup/index.vue'
    import classifyForm from './components/classify-form.vue'
    import { usePages } from '@/core/hooks/pages'

    interface Lists {}

    let tableData = ref<Lists[]>([])

    const { pager, requestApi, resetParams, resetPage } = usePages({
        callback: apiArticleCategoryList,
        params: {},
    })

    // 删除分类
    const handleDelete = async (id: number) => {
        await apiArticleCategoryDelete({ id })
        requestApi()
    }

    // 状态修改
    const handleStatusChange = async (event: Event, id: number) => {
        await apiArticleCategoryStatus({ is_show: event ? 0 : 1, id })
        requestApi()
    }

    onMounted(() => {
        requestApi()
    })
</script>

<style lang="scss" scoped></style>

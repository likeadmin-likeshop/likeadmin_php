<template>
    <div class="role-lists">
        <el-card shadow="never">
            <div v-perms="['auth.role/add']" class="m-b-16">
                <router-link to="/team/role/add">
                    <el-button type="primary">新增角色</el-button>
                </router-link>
            </div>
            <div v-loading="pager.loading">
                <div>
                    <el-table :data="pager.lists">
                        <el-table-column prop="id" label="ID"></el-table-column>
                        <el-table-column prop="name" label="名称"></el-table-column>
                        <el-table-column prop="desc" label="备注"></el-table-column>
                        <el-table-column prop="sort" label="排序"></el-table-column>
                        <el-table-column prop="num" label="管理员人数"></el-table-column>
                        <el-table-column prop="create_time" label="创建时间"></el-table-column>
                        <el-table-column prop label="操作">
                            <template #default="{ row }">
                                <router-link
                                    v-perms="['auth.role/edit']"
                                    class="mr-3"
                                    :to="{
                                        path: '/team/role/add',
                                        query: {
                                            id: row.id
                                        }
                                    }"
                                >
                                    <el-button link type="primary">编辑</el-button>
                                </router-link>
                                <popup
                                    v-perms="['auth.role/delete']"
                                    class="mr-3 inline-block"
                                    @confirm="handleDelete(row.id)"
                                >
                                    <template #trigger>
                                        <el-button link type="primary">删除</el-button>
                                    </template>
                                </popup>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="flex justify-end m-t-16">
                    <pagination v-model="pager" @change="requestApi" />
                </div>
            </div>
        </el-card>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'
import { apiRoleLists, apiRoleDelete } from '@/api/auth'
import { usePages } from '@/core/hooks/pages'
const { pager, requestApi } = usePages({
    callback: apiRoleLists
})

// 删除角色
const handleDelete = async (id: number) => {
    await apiRoleDelete({ id })
    requestApi()
}

requestApi()
</script>
  
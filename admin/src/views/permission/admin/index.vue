<template>
    <div class="admin">
        <el-card shadow="never">
            <el-form class="ls-form" :model="formData" label-width="80px" size="small" inline>
                <el-form-item label="账号：">
                    <el-input v-model="formData.account" class="ls-input" />
                </el-form-item>
                <el-form-item label="名称：">
                    <el-input v-model="formData.name" class="ls-input" />
                </el-form-item>
                <el-form-item label="角色：">
                    <el-select v-model="formData.role_id" placeholder="全部">
                        <el-option
                            v-for="(item, index) in roleList"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
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
        <el-card v-loading="pager.loading" class="m-t-15" shadow="never">
            <router-link to="/permission/admin/edit">
                <el-button type="primary" size="small">新增管理员</el-button>
            </router-link>
            <div class="m-t-15">
                <el-table :data="pager.lists">
                    <el-table-column label="ID" prop="id" min-width="60"></el-table-column>
                    <el-table-column label="头像" min-width="100">
                        <template #default="{ row }">
                            <el-avatar :size="50" :src="row.avatar"></el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column label="账号" prop="account" min-width="100"></el-table-column>
                    <el-table-column label="名称" prop="name" min-width="100"></el-table-column>
                    <el-table-column
                        label="角色"
                        prop="role_name"
                        min-width="100"
                    ></el-table-column>
                    <el-table-column
                        label="创建时间"
                        prop="create_time"
                        min-width="150"
                    ></el-table-column>
                    <el-table-column
                        label="最近登录时间"
                        prop="login_time"
                        min-width="150"
                    ></el-table-column>
                    <el-table-column
                        label="最近登录IP"
                        prop="login_ip"
                        min-width="100"
                    ></el-table-column>
                    <el-table-column label="状态" min-width="100">
                        <template #default="{ row }">
                            <el-switch
                                v-model="row.disable"
                                :active-value="0"
                                :inactive-value="1"
                                @change="changeStatus(row)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150" fixed="right">
                        <template #default="{ row }">
                            <router-link
                                class="m-r-10"
                                :to="{
                                    path: '/permission/admin/edit',
                                    query: {
                                        id: row.id
                                    }
                                }"
                            >
                                <el-button type="text">编辑</el-button>
                            </router-link>
                            <popup class="m-r-10 inline" @confirm="handleDelete(row.id)">
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
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from 'vue'
import Pagination from '@/components/pagination/index.vue'
import Popup from '@/components/popup/index.vue'
import { apiAdminEdit, adminLists, apiAdminDelete, apiRoleLists } from '@/api/auth'
import { usePages } from '@/core/hooks/pages'
export default defineComponent({
    components: {
        Pagination,
        Popup
    },
    setup() {
        // 表单数据
        const formData = reactive({
            account: '',
            name: '',
            role_id: ''
        })
        const roleList: Ref<any[]> = ref([])
        const { pager, requestApi, resetParams, resetPage } = usePages({
            callback: adminLists,
            params: formData
        })
        const changeStatus = (data: any) => {
            apiAdminEdit({
                id: data.id,
                account: data.account,
                name: data.name,
                role_id: data.role_id,
                disable: data.disable,
                multipoint_login: data.multipoint_login
            }).finally(() => {
                requestApi()
            })
        }

        const handleDelete = (id: number) => {
            apiAdminDelete({ id }).then(() => {
                requestApi()
            })
        }

        const getRoleList = () => {
            apiRoleLists({
                page_type: 1
            }).then((res: any) => {
                roleList.value = res.lists
            })
        }
        onMounted(() => {
            requestApi()
            getRoleList()
        })
        return {
            formData,
            roleList,
            pager,
            requestApi,
            resetParams,
            resetPage,
            adminLists,
            changeStatus,
            handleDelete
        }
    }
})
</script>

<style lang="scss" scoped>
.ls-form {
    margin-bottom: -16px;
}
</style>

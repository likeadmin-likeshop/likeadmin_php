<template>
    <div class="admin">
        <el-card shadow="never">
            <el-form
                class="ls-form"
                :model="formData"
                label-width="80px"
                size="small"
                inline
            >
                <el-form-item label="账号：">
                    <el-input class="ls-input" v-model="formData.account" />
                </el-form-item>
                <el-form-item label="名称：">
                    <el-input class="ls-input" v-model="formData.name" />
                </el-form-item>
                <el-form-item label="角色：">
                    <el-select v-model="formData.role" placeholder="全部">
                        <el-option
                            label="Zone one"
                            value="shanghai"
                        ></el-option>
                        <el-option label="Zone two" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <div class="m-l-20">
                        <el-button type="primary">查询</el-button>
                        <el-button>重置</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="m-t-15" shadow="never">
            <router-link to="/permission/admin/edit">
                <el-button type="primary" size="small">新增管理员</el-button>
            </router-link>
            <div class="m-t-15">
                <pagination :fun="adminLists" :params="formData">
                    <template v-slot="{ lists }">
                        <el-table :data="lists" size="medium">
                            <el-table-column label="ID" prop="id">
                            </el-table-column>
                            <el-table-column label="头像">
                                <template v-slot="{ row }">
                                    <el-avatar
                                        :size="50"
                                        :src="row.avatar"
                                    ></el-avatar>
                                </template>
                            </el-table-column>
                            <el-table-column label="账号" prop="account">
                            </el-table-column>
                            <el-table-column label="名称" prop="name">
                            </el-table-column>
                            <el-table-column label="角色" prop="role_name">
                            </el-table-column>
                            <el-table-column
                                label="创建时间"
                                prop="create_time"
                            >
                            </el-table-column>
                            <el-table-column
                                label="最近登录时间"
                                prop="login_time"
                            >
                            </el-table-column>
                            <el-table-column label="最近登录IP" prop="login_ip">
                            </el-table-column>
                            <el-table-column label="状态">
                                <template v-slot="{ row }">
                                    <el-switch
                                        v-model="row.disable"
                                        :active-value="0"
                                        :inactive-value="1"
                                        @change="changeStatus(row)"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <span class="m-r-10">
                                    <el-button type="text" size="mini" @click=""
                                        >编辑
                                    </el-button>
                                </span>
                                <popup class="m-r-10 inline" @confirm="">
                                    <template #trigger>
                                        <el-button type="text" size="mini"
                                            >删除
                                        </el-button>
                                    </template>
                                </popup>
                            </el-table-column>
                        </el-table>
                    </template>
                </pagination>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Pagination from '@/components/pagination/index.vue'
import Popup from '@/components/popup/index.vue'
import { adminEdit, adminLists } from '@/api/auth'
export default defineComponent({
    components: {
        Pagination,
        Popup,
    },
    setup() {
        // 表单数据
        const formData = reactive({
            account: '',
            name: '',
            role: '',
        })
        const changeStatus = (data: any) => {
            adminEdit({
                id: data.id,
                account: data.account,
                name: data.name,
                role_id: data.role_id,
                disable: data.disable,
                multipoint_login: data.multipoint_login,
            })
        }
        return {
            formData,
            adminLists,
            changeStatus,
        }
    },
})
</script>

<style lang="scss" scoped>
.ls-form {
    margin-bottom: -16px;
}
</style>

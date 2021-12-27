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
                <el-table :data="[]" size="medium">
                    <el-table-column
                        label="用户信息"
                        min-width="300"
                        show-overflow-tooltip
                    >
                        <template v-slot="scope">
                            <div class="flex">
                                <el-image
                                    :src="scope.row.avatar"
                                    style="width: 34px; height: 34px"
                                    class="flex-none"
                                >
                                </el-image>
                                <div class="m-l-10 line-1">
                                    {{ scope.row.nickname }}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total_num" label="成交单数">
                    </el-table-column>
                    <el-table-column prop="total_order_amount" label="消费金额">
                        <template v-slot="scope">
                            ¥{{ scope.row.total_order_amount }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup() {
        // 表单数据
        const formData = reactive({
            account: '',
            name: '',
            role: '',
        })

        return {
            formData,
        }
    },
}
</script>

<style lang="scss" scoped>
.ls-form {
    margin-bottom: -16px;
}
</style>

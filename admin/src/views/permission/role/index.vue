<template>
    <div class="role">
        <el-card shadow="never">
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

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    setup() {
       
    },
})
</script>

<style lang="scss" scoped>
</style>

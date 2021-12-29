<!-- 系统环境 -->
<template>
    <div class="system-environment">
        <el-card shadow="never">
            <div>服务器信息</div>
            <div class="m-t-15">
                <el-table :data="[]" size="medium">
                    <el-table-column prop="total_num" label="参数">
                    </el-table-column>
                    <el-table-column prop="total_order_amount" label="值">
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-card shadow="never" class="m-t-15">
            <div>PHP环境要求</div>
            <div class="m-t-15">
                <el-table :data="[]" size="medium">
                    <el-table-column prop="total_num" label="选项">
                    </el-table-column>
                    <el-table-column prop="total_order_amount" label="要求">
                    </el-table-column>
                    <el-table-column prop="total_num" label="状态">
                        <template v-slot="scope">
                            <i class="el-icon-check" style="color: #67C23A;"></i>
                            <i class="el-icon-close" style="color: #DB2828;"></i>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total_order_amount" label="说明及帮助">
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-card shadow="never" class="m-t-15">
            <div>目录权限</div>
            <div class="m-t-15">
                <el-table :data="[]" size="medium">
                    <el-table-column prop="total_num" label="目录">
                    </el-table-column>
                    <el-table-column prop="total_order_amount" label="要求">
                    </el-table-column>
                    <el-table-column prop="total_num" label="状态">
                        <template v-slot="scope">
                            <i class="el-icon-check" style="color: #67C23A;"></i>
                            <i class="el-icon-close" style="color: #DB2828;"></i>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total_order_amount" label="说明及帮助">
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

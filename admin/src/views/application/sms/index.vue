<template>
    <el-card shadow="never">
        <el-table :data="tableData" style="width: 100%" size="mini">
            <el-table-column prop="name" label="短信通道" min-width="180" />
            <el-table-column label="状态" min-width="180">
                <template #="scope">
                    <!-- 短信通知的当前状态 -->
                    <el-tag :type="scope.row.status == 0 ? 'danger' : 'success'" effect="plain">{{
                        scope.row.status == 0 ? '关闭' : '启用'
                    }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="200">
                <template #="scope">
                    <router-link
                        class="m-r-10"
                        :to="{
                            path: '/application/sms/detail',
                            query: {
                                type: scope.$index === 0 ? 'ali' : 'tencent',
                            },
                        }"
                    >
                        <el-button type="text">设置</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { apiSmsLists } from '@/api/application'

    /** Data Start **/
    let tableData = ref<Array<object>>([])
    /** Data End **/

    /** Methods Start **/
    const getSmsLists = async (): Promise<void> => {
        const res: any = await apiSmsLists()
        tableData.value = [{ ...res.ali }, { ...res.tencent }]
    }
    /** Methods Start **/

    /** Life Cycle Start **/
    getSmsLists()
    /** Life Cycle Start **/
</script>

<style lang="scss" scoped></style>

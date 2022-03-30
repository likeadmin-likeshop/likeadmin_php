<template>
    <el-card shadow="never">
        <!-- Header Alert Start -->
        <el-alert
            title="温馨提示： 1.平台配置在各个场景下的通知发送方式和内容模板。"
            type="primary"
            :closable="false"
        />
        <!-- Header Alert End -->
    </el-card>

    <el-card shadow="never" class="m-t-15">
        <!-- Main TableData Start -->
        <el-tabs v-model="formData.recipient" @click="changeTabs">
            <el-tab-pane label="通知用户" :name="1"></el-tab-pane>
            <el-tab-pane label="通知平台" :name="2"></el-tab-pane>
        </el-tabs>

        <el-table
            ref="tableDataRef"
            class="m-t-15"
            :data="pager.lists"
            style="width: 100%"
            size="mini"
        >
            <el-table-column property="scene_name" label="通知名称" max-width="200" />
            <el-table-column property="type_desc" label="通知类型" max-width="355" />
            <el-table-column label="短信通知" max-width="300">
                <template #default="scope">
                    <!-- 短信通知的当前状态 -->
                    <el-tag
                        :type="scope.row.sms_status_desc == '停用' ? 'danger' : 'success'"
                        effect="plain"
                        >{{ scope.row.sms_status_desc }}</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column label="操作" max-width="300">
                <template #default="scope">
                    <router-link
                        class="m-r-10"
                        :to="{
                            path: '/application/notification/detail',
                            query: {
                                id: scope.row.id,
                            },
                        }"
                    >
                        <el-button type="text">设置</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <!-- Main TableData End -->

        <!-- Footer Pagination Start -->
        <div class="flex row-right">
            <pagination
                v-model="pager"
                @change="requestApi"
                layout="total, prev, pager, next, jumper"
            />
        </div>
        <!-- Footer Pagination End -->
    </el-card>
</template>

<script lang="ts" setup>
    import { apiNoticeLists } from '@/api/application'
    import { ref } from 'vue'
    import Pagination from '@/components/pagination/index.vue'
    import { usePages } from '@/core/hooks/pages'

    /** Data Start **/
    let formData = ref({
        recipient: 1 as number,
    })
    const { pager, requestApi } = usePages({
        callback: apiNoticeLists,
        params: formData.value,
    })
    /** Data End **/

    /** Methods Start **/
    const changeTabs = (): void => {
        requestApi()
    }
    /** Methods End **/

    /** LifeCycle Start **/
    requestApi()
    /** LifeCycle End **/
</script>

<style lang="scss">
    .el-tabs__nav-wrap {
        background: none !important;
    }
    .el-tabs__nav-wrap::after {
        background: none !important;
    }
    .el-tabs__item {
        margin-right: 30px;
    }
</style>

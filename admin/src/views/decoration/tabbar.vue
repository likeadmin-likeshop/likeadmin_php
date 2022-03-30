<template>
    <div class="estate">
        <el-card shadow="never">
            <el-alert
                title="* 编辑移动端商城底部标签栏的图标和名称"
                type="info"
                :closable="false"
            ></el-alert>
        </el-card>

        <el-card class="m-t-15" shadow="never" v-loading="pager.loading">
            <el-table :data="pager.lists">
                <el-table-column label="导航名称" prop="name"></el-table-column>

                <el-table-column label="默认图标" prop="un_selected_icon">
                    <template #default="scope">
                        <div class="flex">
                            <el-image
                                :src="scope.row.un_selected_icon"
                                style="width: 70px; height: 70px"
                            ></el-image>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="选中图标" prop="selected_icon">
                    <template #default="scope">
                        <div class="flex">
                            <el-image
                                :src="scope.row.selected_icon"
                                style="width: 70px; height: 70px"
                            ></el-image>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="150" fixed="right">
                    <template #default="scope">
                        <tabbar-edit
                            :id="scope.row.id"
                            type="text"
                            btnText="编辑"
                            @refresh="requestApi"
                        ></tabbar-edit>
                    </template>
                </el-table-column>
            </el-table>

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
    import { onMounted } from 'vue'
    import { apiTabBarLists } from '@/api/decoration'
    import Pagination from '@/components/pagination/index.vue'
    import tabbarEdit from './components/tabbar-edit.vue'
    import { usePages } from '@/core/hooks/pages'

    const { pager, requestApi } = usePages({
        callback: apiTabBarLists,
    })

    onMounted(() => {
        requestApi()
    })
</script>

<style lang="scss" scoped>
    .el-alert.el-alert--info {
        background-color: $color-primary-light-9;
        color: $color-primary;
    }
</style>

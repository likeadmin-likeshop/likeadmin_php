<template>
    <div class="estate">
        <el-card shadow="never">
            <el-alert
                title="* 设置移动端商城首页导航区的菜单，支持选择跳转商城页面、或者填写自定义链接"
                type="info"
                :closable="false"
            ></el-alert>
        </el-card>

        <el-card class="m-t-15" shadow="never" v-loading="pager.loading">
            <router-link to="/decoration/home_edit">
                <el-button type="primary" size="small"> 新增菜单 </el-button>
            </router-link>

            <el-table class="m-t-20" :data="pager.lists">
                <el-table-column label="菜单图标" prop="image">
                    <template #default="scope">
                        <div class="flex">
                            <el-image
                                :src="scope.row.image"
                                style="width: 70px; height: 70px"
                            ></el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="菜单名称" prop="name"></el-table-column>
                <el-table-column label="链接地址" prop="link_address_desc"> </el-table-column>
                <el-table-column label="排序" prop="sort"></el-table-column>
                <el-table-column label="状态" prop="status_desc"> </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                    <template #default="scope">
                        <router-link
                            class="m-r-10"
                            :to="{
                                path: '/decoration/home_edit',
                                query: {
                                    id: scope.row.id,
                                },
                            }"
                        >
                            <el-button type="text">编辑</el-button>
                        </router-link>

                        <popup
                            class="m-r-10 inline"
                            @confirm="handleStatusChange(scope.row.status, scope.row.id)"
                        >
                            <template #trigger>
                                <el-button type="text">
                                    {{ scope.row.status ? '停用' : '启用' }}
                                </el-button>
                            </template>
                            {{
                                scope.row.status ? '确定要停用当前菜单吗?' : '确定要启用当前菜单吗?'
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
    import { onMounted, reactive, ref } from 'vue'
    import { apiHomeMenuLists, apiHomeMenuStatusEdit, apiHomeMenuDel } from '@/api/decoration'
    import Pagination from '@/components/pagination/index.vue'
    import Popup from '@/components/Popup/index.vue'
    import { usePages } from '@/core/hooks/pages'

    const { pager, requestApi } = usePages({
        callback: apiHomeMenuLists,
    })

    // 删除菜单
    const handleDelete = async (id: number): Promise<void> => {
        await apiHomeMenuDel({ id })
        requestApi()
    }
    // 状态修改
    const handleStatusChange = async (event: Event, id: number): Promise<void> => {
        await apiHomeMenuStatusEdit({ status: event ? 0 : 1, id })
        requestApi()
    }

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

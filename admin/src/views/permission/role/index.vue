<template>
    <div class="role">
        <el-card shadow="never">
            <router-link to='/permission/role/edit'>
                <el-button type="primary" size="small">新增角色</el-button>
            </router-link>
            <div class="m-t-15">
                <pagination @change="getRoleLists">
                    <template v-slot="{ lists }">
                        <el-table :data="lists" size="medium">
                            <el-table-column prop="id" label="ID">
                            </el-table-column>
                            <el-table-column prop="name" label="名称">
                            </el-table-column>
                            <el-table-column prop="desc" label="备注">
                            </el-table-column>
                            <el-table-column prop="" label="权限">
                            </el-table-column>
                            <el-table-column prop="create_time" label="创建时间">
                            </el-table-column>
                            <el-table-column prop="" label="操作">
                                <template v-slot="{ row }">
                                    <!-- 编辑 -->
                                    <router-link class="m-r-10" :to="{
                                        path: '/permission/role/edit',
                                        query: {
                                            id: row.id,
                                            mode: PageMode['EDIT']
                                        },
                                    }">
                                        <el-button type="text" size="mini">
                                            编辑
                                        </el-button>
                                    </router-link>
                                    <!-- 删除 -->
                                    <popup class="m-r-10 inline" @confirm="handleDelete">
                                        <template #trigger>
                                            <el-button type="text" size="mini">
                                                删除
                                            </el-button>
                                        </template>
                                    </popup>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </pagination>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
    import {
        defineComponent,
        reactive
    } from "vue";
    import {
        apiRoleLists,
        apiRoleDel
    } from '@/api/auth'
    import Pagination from '@/components/pagination/index.vue'
    import Popup from '@/components/popup/index.vue'
    import {
        PageMode
    } from '@/utils/type.ts'
    import { usePages }  from '@/core/hooks/pages'
    export default defineComponent({
        components: {
            Pagination,
            Popup,
        },
        setup() {
            // 表单数据
            const formData = reactive({
                id: 0, // 角色id
                name: '', // 角色名称
                desc: '', // 备注
                create_time: '', // 创建时间
                num: 0, // 使用该角色的人数
            })

            const { pager, requestApi } = usePages();

            // 删除角色
            const handleDelete = (id: number) => {
                apiRoleDel({
                        id
                    })
                    .then((res: any) => {
                        console.log('res', res)
                    })
                    .catch((err: any) => {
                        console.log('err', err)
                    })
            }

            // 获取角色列表
            const getRoleLists = () => {
                requestApi(apiRoleLists, )
            }

            return {
                formData,
                apiRoleLists,
                handleDelete,
                pager
            }
        },
    })
</script>

<style lang="scss" scoped>
</style>

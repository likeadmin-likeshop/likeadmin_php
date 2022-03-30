<template>
    <div class="estate">
        <el-card shadow="never">
            <el-form class="ls-form" :model="formData" label-width="80px" size="small" inline>
                <el-form-item label="广告位名称">
                    <el-input
                        placeholder="请输入广告位标题"
                        class="ls-input"
                        v-model="formData.username"
                    />
                </el-form-item>

                <el-form-item label="广告位属性">
                    <el-select v-model="formData.house_type" placeholder="全部">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="系统默认" :value="1"></el-option>
                        <el-option label="自定义" :value="2"></el-option>
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

        <el-card class="m-t-15" shadow="never" v-loading="pager.loading">
            <router-link to="/content/advertising/advertising_edit">
                <el-button type="primary" size="small"> 新增广告位 </el-button>
            </router-link>

            <div>
                <el-table class="m-t-20" :data="pager.lists">
                    <el-table-column label="ID" prop="id" min-width="30"></el-table-column>
                    <el-table-column label="广告位名称" prop="username"> </el-table-column>
                    <el-table-column label="广告位属性" prop="mobile"></el-table-column>
                    <el-table-column label="图片建议尺寸" prop="budget"> </el-table-column>
                    <el-table-column label="排序" prop="area"></el-table-column>
                    <el-table-column label="广告位状态" prop="plot"></el-table-column>
                    <el-table-column label="添加时间" prop="floor"> </el-table-column>
                    <el-table-column label="操作" width="150" fixed="right">
                        <template v-slot="{ row }">
                            <router-link
                                class="m-r-10"
                                :to="{
                                    path: '',
                                    query: {
                                        id: row.id,
                                    },
                                }"
                            >
                                <el-button type="text">编辑</el-button>
                            </router-link>
                            <popup class="m-r-10 inline">
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
                    @change="requestApi"
                    layout="total, prev, pager, next, jumper"
                />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue'
    import { apiBuyHouseList } from '@/api/entrust'
    import Pagination from '@/components/pagination/index.vue'
    import Popup from '@/components/Popup/index.vue'
    import { usePages } from '@/core/hooks/pages'

    const formData = reactive({
        username: '',
        mobile: '',
        house_type: '',
        status: '',
        start: '',
        end: '',
    })

    const { pager, requestApi, resetParams, resetPage } = usePages({
        callback: apiBuyHouseList,
        params: formData,
    })
</script>

<style lang="scss" scoped></style>

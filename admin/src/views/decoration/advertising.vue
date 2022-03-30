<template>
    <div class="estate">
        <el-card shadow="never">
            <el-form class="ls-form" :model="formData" label-width="80px" size="small" inline>
                <el-form-item label="广告名称">
                    <el-input
                        placeholder="请输入广告位标题"
                        class="ls-input"
                        v-model="formData.name"
                    />
                </el-form-item>

                <el-form-item label="广告位置">
                    <el-select v-model="formData.pid" placeholder="全部">
                        <el-option
                            v-for="(item, index) in adPositionLists"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="广告状态">
                    <el-select v-model="formData.status" placeholder="全部">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" :value="1"></el-option>
                        <el-option label="停用" :value="0"></el-option>
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
            <router-link to="/decoration/advertising_edit">
                <el-button type="primary" size="small"> 新增广告 </el-button>
            </router-link>

            <div>
                <el-table class="m-t-20" :data="pager.lists">
                    <el-table-column label="ID" prop="id" min-width="30"></el-table-column>
                    <el-table-column label="广告名称" prop="name"> </el-table-column>
                    <el-table-column label="广告位置" prop="ap_name"></el-table-column>
                    <el-table-column label="广告图片" prop="image">
                        <template #default="scope">
                            <div class="flex col-center">
                                <el-image
                                    :src="scope.row.image"
                                    style="width: 60px; height: 60px"
                                    :fit="'cover'"
                                ></el-image>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="广告链接" prop="link_address_desc"></el-table-column>
                    <el-table-column label="排序" prop="sort"></el-table-column>
                    <el-table-column label="广告状态" prop="status">
                        <template #default="scope">
                            <el-switch
                                v-model="scope.row.status"
                                :active-value="1"
                                :inactive-value="0"
                                @change="handleStatusChange($event, scope.row.id)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150" fixed="right">
                        <template #default="scope">
                            <router-link
                                class="m-r-10"
                                :to="{
                                    path: '/decoration/advertising_edit',
                                    query: {
                                        id: scope.row.id,
                                    },
                                }"
                            >
                                <el-button type="text">编辑</el-button>
                            </router-link>

                            <popup class="m-r-10 inline" @confirm="handleDelete(scope.row.id)">
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
    import { apiAdLists, apiAdDel, apiAdEditStatus, apiAdPositionLists } from '@/api/decoration'
    import Pagination from '@/components/pagination/index.vue'
    import Popup from '@/components/Popup/index.vue'
    import { usePages } from '@/core/hooks/pages'
    import { number } from 'echarts/core'

    /** Interface Start **/
    interface formDataObj {
        name?: string
        status?: string
        pid: string
    }
    interface ListsObj {
        name: string
        index: number
        id: number | string
    }
    /** Interface End **/

    /** Data Start **/
    let adPositionLists = ref<Array<ListsObj> | null>([]) //广告位列表
    let formData = reactive<formDataObj>({
        name: '',
        status: '',
        pid: '',
    })
    const { pager, requestApi, resetParams, resetPage } = usePages({
        callback: apiAdLists,
        params: formData,
    })
    /** Data End **/

    /** Methods Start **/
    //获取广告位列表
    const getAdPositionLists = async (): Promise<void> => {
        const res = await apiAdPositionLists()
        ;(adPositionLists.value as object) = (res as any).lists
    }

    // 删除广告位
    const handleDelete = async (id: number): Promise<void> => {
        await apiAdDel({ id })
        requestApi()
    }

    // 状态修改
    const handleStatusChange = async (event: Event, id: number): Promise<void> => {
        await apiAdEditStatus({ status: event, id })
        requestApi()
    }

    /** Methods End **/

    onMounted(() => {
        requestApi()
        getAdPositionLists()
    })
</script>

<style lang="scss" scoped></style>

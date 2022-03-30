<template>
    <div class="estate">
        <el-card shadow="never">
            <el-form class="ls-form" :model="formData" label-width="80px" size="small" inline>
                <el-form-item label="资讯标题">
                    <el-input
                        placeholder="请输入资讯标题"
                        class="ls-input"
                        v-model="formData.title"
                    />
                </el-form-item>

                <el-form-item label="资讯分类">
                    <el-select v-model="formData.cid" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in informationClassify"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
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
            <router-link to="/content/information/information_edit">
                <el-button type="primary" size="small"> 新增咨询 </el-button>
            </router-link>

            <div>
                <el-table class="m-t-20" :data="pager.lists">
                    <el-table-column label="ID" prop="id" min-width="30"></el-table-column>
                    <el-table-column label="封面" prop="image">
                        <template #default="scope">
                            <div class="flex">
                                <el-image
                                    :src="scope.row.image"
                                    style="width: 70px; height: 70px"
                                ></el-image>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="资讯标题" prop="title"></el-table-column>
                    <el-table-column label="资讯分类" prop="cate_name"> </el-table-column>
                    <el-table-column label="浏览量" prop="visit"></el-table-column>
                    <el-table-column label="资讯状态" prop="is_show">
                        <template #default="scope">
                            <el-switch
                                v-model="scope.row.is_show"
                                :active-value="1"
                                :inactive-value="0"
                                @change="handleStatusChange($event, scope.row.id)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="发布时间" prop="create_time"> </el-table-column>
                    <el-table-column label="操作" width="150" fixed="right">
                        <template #default="scope">
                            <router-link
                                class="m-r-10"
                                :to="{
                                    path: '/content/information/information_edit',
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
    import {
        apiArticleList,
        apiAllArticleCategory,
        apiArticleDelete,
        apiArticleStatus,
    } from '@/api/information'
    import { onMounted, reactive, ref } from 'vue'
    import Pagination from '@/components/pagination/index.vue'
    import Popup from '@/components/Popup/index.vue'
    import { usePages } from '@/core/hooks/pages'

    interface formDataObj {
        title?: string
        cid: string
    }

    // 资讯分类
    let informationClassify = ref<any[]>([])

    let formData = ref<formDataObj>({
        title: '',
        cid: '',
    })

    const { pager, requestApi, resetParams, resetPage } = usePages({
        callback: apiArticleList,
        params: formData.value,
    })

    // 获取资讯分类
    const getInformationClassify = async () => {
        ;(informationClassify.value as {}) = await apiAllArticleCategory()
    }

    // 修改状态
    const handleStatusChange = async (event: Event, id: number) => {
        await apiArticleStatus({ is_show: event, id })
        requestApi()
    }

    // 删除
    const handleDelete = async (id: number) => {
        await apiArticleDelete({ id })
        requestApi()
    }

    onMounted(() => {
        requestApi()
        getInformationClassify()
    })
</script>

<style lang="scss" scoped></style>

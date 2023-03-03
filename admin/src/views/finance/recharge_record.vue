<template>
    <div class="article-lists">
        <el-card class="!border-none" shadow="never">
            <el-alert
                type="warning"
                title="温馨提示：用户充值记录"
                :closable="false"
                show-icon
            ></el-alert>
            <el-form ref="formRef" class="mb-[-16px] mt-[16px]" :model="queryParams" :inline="true">
                <el-form-item label="充值单号">
                    <el-input
                        class="w-[280px]"
                        v-model="queryParams.sn"
                        placeholder="请输入充值单号"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="用户信息">
                    <el-input
                        class="w-[280px]"
                        v-model="queryParams.user_info"
                        placeholder="请输入用户编号/昵称/手机号"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-select class="w-[280px]" v-model="queryParams.pay_way">
                        <el-option label="全部" value />
                        <el-option label="微信支付" :value="2" />
                        <el-option label="微信支付" :value="3" />
                    </el-select>
                </el-form-item>
                <el-form-item label="支付状态">
                    <el-select class="w-[280px]" v-model="queryParams.pay_way">
                        <el-option label="全部" value />
                        <el-option label="未支付" :value="0" />
                        <el-option label="已支付" :value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item label="下单时间">
                    <daterange-picker
                        v-model:startTime="queryParams.start_time"
                        v-model:endTime="queryParams.end_time"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                    <export-data
                        class="ml-2.5"
                        :fetch-fun="rechargeLists"
                        :params="queryParams"
                        :page-size="pager.size"
                    />
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none mt-4" shadow="never">
            <el-table size="large" v-loading="pager.loading" :data="pager.lists">
                <el-table-column label="ID" prop="id" min-width="80" />
                <el-table-column label="用户信息" min-width="160">
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <image-contain
                                class="flex-none mr-2"
                                :src="row.avatar"
                                :width="40"
                                :height="40"
                                preview-teleported
                                fit="contain"
                            />
                            {{ row.nickname }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="充值单号" prop="mobile" min-width="100" />
                <el-table-column label="充值金额" prop="change_amount" min-width="100">
                </el-table-column>
                <el-table-column label="支付方式" prop="left_amount" min-width="100" />
                <el-table-column label="支付状态" prop="change_type_desc" min-width="120" />
                <el-table-column label="提交时间" prop="source_sn" min-width="100" />
                <el-table-column label="支付时间" prop="create_time" min-width="120" />
                <el-table-column label="操作" width="120" fixed="right">
                    <template #default="{ row }">
                        <el-button v-perms="['user.user/detail']" type="primary" link>
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex justify-end mt-4">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup name="articleLists">
import { rechargeLists } from '@/api/finance'
import { usePaging } from '@/hooks/usePaging'
const queryParams = reactive({
    sn: '',
    user_info: '',
    pay_way: '',
    pay_status: '',
    start_time: '',
    end_time: ''
})

const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: rechargeLists,
    params: queryParams
})

getLists()
</script>

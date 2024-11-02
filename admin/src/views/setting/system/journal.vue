<!-- 系统日志 -->
<template>
    <div class="journal">
        <el-card class="!border-none" shadow="never">
            <el-form class="ls-form" :model="formData" inline>
                <el-form-item class="w-[280px]" label="管理员">
                    <el-input
                        placeholder="请输入"
                        v-model="formData.admin_name"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>

                <el-form-item class="w-[280px]" label="访问方式">
                    <el-select v-model="formData.type" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in visitType"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item class="w-[280px]" label="来源IP">
                    <el-input
                        placeholder="请输入"
                        v-model="formData.ip"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>

                <el-form-item label="访问时间">
                    <daterange-picker
                        v-model:startTime="formData.start_time"
                        v-model:endTime="formData.end_time"
                    />
                </el-form-item>

                <el-form-item class="w-[280px]" label="访问链接">
                    <el-input
                        placeholder="请输入"
                        v-model="formData.url"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                    <export-data
                        class="ml-2.5"
                        :fetch-fun="systemLogLists"
                        :params="formData"
                        :page-size="pager.size"
                    />
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="!border-none mt-4" shadow="never" v-loading="pager.loading">
            <div>
                <el-table :data="pager.lists" size="large">
                    <el-table-column label="记录ID" prop="id" />
                    <el-table-column label="操作" prop="action" min-width="120" />
                    <el-table-column label="管理员" prop="admin_name" min-width="120" />
                    <el-table-column label="管理员ID" prop="admin_id" min-width="120" />
                    <el-table-column label="访问链接" prop="url" min-width="160" />
                    <el-table-column label="访问方式" prop="type" />
                    <el-table-column label="访问参数" prop="params" min-width="160" />
                    <el-table-column label="来源IP" prop="ip" min-width="160" />
                    <el-table-column label="日志时间" prop="create_time" min-width="180" />
                </el-table>
            </div>
            <div class="flex mt-4 justify-end">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="journal">
import { systemLogLists } from '@/api/setting/system'
import { usePaging } from '@/hooks/usePaging'

interface formDataObj {
    admin_name?: string // 管理员
    url?: string // 访问链接
    ip?: string // ip
    type?: string // 访问方式
    start_time?: string // 日志时间开始
    end_time?: string // 日志时间结束
}

// 查询表单
const formData = ref<formDataObj>({
    admin_name: '',
    url: '',
    ip: '',
    type: '',
    start_time: '',
    end_time: ''
})

// 访问方式
const visitType = ref<Array<any>>([
    {
        label: '全部',
        value: ''
    },
    {
        label: 'get',
        value: 'get'
    },
    {
        label: 'post',
        value: 'post'
    },
    {
        label: 'put',
        value: 'put'
    },
    {
        label: 'delete',
        value: 'delete'
    },
    {
        label: 'option',
        value: 'option'
    }
])

const { pager, getLists, resetParams, resetPage } = usePaging({
    fetchFun: systemLogLists,
    params: formData.value
})

onMounted(() => {
    getLists()
})
</script>

<style lang="scss" scoped></style>

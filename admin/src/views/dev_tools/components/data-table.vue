<template>
    <div class="data-table">
        <popup
            ref="popupRef"
            class="m-r-10 inline"
            :clickModalClose="false"
            title="选择表"
            width="900px"
            :async="true"
            @confirm="handleConfirm"
        >
            <template #trigger>
                <slot></slot>
            </template>
            <el-form class="ls-form" :model="formData" label-width="80px" size="small" inline>
                <el-form-item label="表名称">
                    <el-input v-model="formData.name" style="width: 200px;" />
                </el-form-item>
                <el-form-item label="表描述">
                    <el-input v-model="formData.comment" style="width: 200px;" />
                </el-form-item>
                <el-form-item>
                    <div class="m-l-20">
                        <el-button type="primary" @click="resetPage">查询</el-button>
                        <el-button @click="resetParams">重置</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <div class="m-15">
                <el-table height="400" :data="pager.lists" size="small">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="表名称" prop="name" min-width="100" />
                    <el-table-column label="表描述" prop="comment" min-width="100" />
                    <el-table-column label="创建时间" prop="create_time" min-width="100" />
                </el-table>
            </div>
            <div class="flex row-right">
                <pagination
                    v-model="pager"
                    layout="total, prev, pager, next, jumper"
                    @change="requestApi"
                />
            </div>
        </popup>
    </div>
</template>

<script lang="ts" setup>

import { reactive, shallowRef, watch } from 'vue'
import Popup from '@/components/popup/index.vue'
import Pagination from '@/components/pagination/index.vue'
import { usePages } from '@/core/hooks/pages';
import { apiDataTable } from '@/api/dev_tools';

const popupRef = shallowRef<InstanceType<typeof Popup>>()

const formData = reactive({
    name: '', // 表名称
    comment: '', // 表描述
})

const { pager, requestApi, resetParams, resetPage } = usePages({
    callback: apiDataTable,
    params: formData,
    size: 10
})

const handleConfirm = () => {

}

watch(() => popupRef.value?.visible, (value) => {
    if(value) requestApi()
})

</script>

<style lang="scss" scoped>

</style>
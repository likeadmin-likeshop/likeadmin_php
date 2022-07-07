<template>
    <div class="data-table">
        <popup
            ref="popupRef"
            class="inline"
            :clickModalClose="false"
            title="选择表"
            width="900px"
            :async="true"
            @confirm="handleConfirm"
        >
            <template #trigger>
                <slot></slot>
            </template>
            <el-form class="ls-form" :model="formData" label-width="80px" inline>
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
            <div class="m-15" v-loading="pager.loading">
                <el-table
                    height="400"
                    :data="pager.lists"
                    @selection-change="handleSelectionChange"
                >
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

import { reactive, ref, shallowRef, watch } from 'vue'
import Popup from '@/components/popup/index.vue'
import Pagination from '@/components/pagination/index.vue'
import { usePages } from '@/core/hooks/pages';
import { apiDataTable, apiSelectTable } from '@/api/dev_tools';

const emit = defineEmits<{
    (event: 'success'): void
}>()

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

const selectData = ref<any[]>([])

const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ name, comment }) => ({
        name,
        comment
    }))
}

const handleConfirm = async () => {
    await apiSelectTable({
        table: selectData.value
    })
    popupRef.value?.close()
    emit('success')
}


watch(() => popupRef.value?.visible, (value) => {
    if (value) requestApi()
})

</script>

<style lang="scss" scoped>
</style>
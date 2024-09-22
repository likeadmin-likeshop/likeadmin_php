<template>
    <div class="data-table">
        <popup
            ref="popupRef"
            :clickModalClose="false"
            title="选择表"
            width="900px"
            :async="true"
            @confirm="handleConfirm"
        >
            <template #trigger>
                <slot></slot>
            </template>
            <el-form class="ls-form" :model="formData" inline>
                <el-form-item class="w-[280px]" label="表名称">
                    <el-input v-model="formData.name" clearable @keyup.enter="resetPage" />
                </el-form-item>
                <el-form-item class="w-[280px]" label="表描述">
                    <el-input v-model="formData.comment" clearable @keyup.enter="resetPage" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="m-4" v-loading="pager.loading">
                <el-table
                    height="400"
                    size="large"
                    :data="pager.lists"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="表名称" prop="name" min-width="150" />
                    <el-table-column label="表描述" prop="comment" min-width="160" />
                    <el-table-column label="创建时间" prop="create_time" min-width="180" />
                </el-table>
            </div>
            <div class="flex justify-end mt-4">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </popup>
    </div>
</template>

<script lang="ts" setup>
import { dataTable, selectTable } from '@/api/tools/code'
import Pagination from '@/components/pagination/index.vue'
import Popup from '@/components/popup/index.vue'
import { usePaging } from '@/hooks/usePaging'
import feedback from '@/utils/feedback'

const emit = defineEmits<{
    (event: 'success'): void
}>()

const popupRef = shallowRef<InstanceType<typeof Popup>>()

const formData = reactive({
    name: '', // 表名称
    comment: '' // 表描述
})

const { pager, getLists, resetParams, resetPage } = usePaging({
    fetchFun: dataTable,
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
    if (!selectData.value.length) return feedback.msgError('请选择数据表')
    await selectTable({
        table: selectData.value
    })
    popupRef.value?.close()
    emit('success')
}

watch(
    () => popupRef.value?.visible,
    (value) => {
        if (value) getLists()
    }
)
</script>

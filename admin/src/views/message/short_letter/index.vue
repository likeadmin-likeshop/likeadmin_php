<template>
    <div>
        <el-card class="!border-none" shadow="never" v-loading="state.loading">
            <el-table size="large" :data="state.lists">
                <el-table-column label="短信渠道" prop="name" min-width="120" />
                <el-table-column label="状态" min-width="120">
                    <template #default="{ row }">
                        <el-tag v-if="row.status == 1">开启</el-tag>
                        <el-tag type="danger" v-else>关闭</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="120" fixed="right">
                    <template #default="{ row }">
                        <el-button
                            v-perms="['notice.sms_config/setConfig']"
                            type="primary"
                            link
                            @click="handleSet(row.type)"
                        >
                            设置
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <edit-popup ref="editRef" @success="getLists" />
    </div>
</template>
<script lang="ts" setup name="shortLetter">
import { smsLists } from '@/api/message'

import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()

// 列表数据
const state = reactive({
    loading: false,
    lists: []
})

// 获取存储引擎列表数据
const getLists = async () => {
    try {
        state.loading = true
        state.lists = await smsLists()
        state.loading = false
    } catch (error) {
        state.loading = false
    }
}

const handleSet = (alias: string) => {
    editRef.value?.open(alias)
}

getLists()
</script>

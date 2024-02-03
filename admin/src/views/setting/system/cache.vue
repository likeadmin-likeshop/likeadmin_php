<!-- 系统缓存 -->
<template>
    <div class="cache">
        <el-card class="!border-none" shadow="never">
            <el-alert
                type="warning"
                title="温馨提示：管理系统运行过程中产生的缓存"
                :closable="false"
                show-icon
            ></el-alert>
        </el-card>

        <el-card class="!border-none mt-4" shadow="never">
            <el-table :data="cacheDate" size="large">
                <el-table-column label="管理内容" prop="content" min-width="130"></el-table-column>
                <el-table-column label="内容说明" prop="desc" min-width="180"></el-table-column>
                <el-table-column label="操作" width="130" fixed="right">
                    <template #default>
                        <el-button type="primary" link @click="handleClean">清除系统缓存</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="cache">
import { systemCacheClear } from '@/api/setting/system'
import feedback from '@/utils/feedback'

// 列表数据
const cacheDate = ref<Array<object>>([
    {
        content: '系统缓存',
        desc: '系统运行过程中产生的各类缓存数据'
    }
])

// 清理缓存
const handleClean = async () => {
    await feedback.confirm('确认清除系统缓存？')
    await systemCacheClear()
    window.location.reload()
}
</script>

<!-- 系统缓存 -->
<template>
    <div class="cache">
        <el-card shadow="never">
            <el-alert
                class="xxl"
                title="温馨提示：管理系统运行过程中产生的缓存"
                type="primary"
                :closable="false"
                show-icon
            >
            </el-alert>
        </el-card>

        <el-card class="m-t-15" shadow="never">
            <div>
                <el-table class="m-t-20" :data="cacheDate">
                    <el-table-column label="管理内容" prop="content"></el-table-column>
                    <el-table-column label="内容说明" prop="desc"> </el-table-column>
                    <el-table-column label="操作" width="150" fixed="right">
                        <template #default="scope">
                            <popup class="m-r-10 inline" @confirm="handleClean" content="确定要清除系统缓存？">
                                <template #trigger>
                                    <el-button type="text">清除系统缓存</el-button>
                                </template>
                            </popup>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
    import {
        apiSystemCacheClear
    } from '@/api/setting'
    import { ref } from 'vue'
    import Popup from '@/components/Popup/index.vue'

    // 列表数据
    let cacheDate = ref<Array<object>>([{
		content: '系统缓存',
		desc: '系统运行过程中产生的各类缓存数据',
	}])

    // 清理缓存
    const handleClean = async () => {
        await apiSystemCacheClear()
    }
</script>

<style lang="scss" scoped></style>

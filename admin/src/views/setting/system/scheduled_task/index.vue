<template>
    <div>
        <el-card shadow="never" class="!border-none">
            <router-link
                v-perms="['crontab.crontab/add', 'crontab.crontab/add:edit']"
                :to="getRoutePath('crontab.crontab/add:edit')"
            >
                <el-button type="primary" class="mb-[16px]">
                    <template #icon>
                        <icon name="el-icon-Plus" />
                    </template>
                    新增
                </el-button>
            </router-link>

            <el-table
                ref="paneTable"
                class="m-t-24"
                :data="pager.lists"
                v-loading="pager.loading"
                style="width: 100%"
            >
                <el-table-column prop="name" label="名称" min-width="120" />
                <el-table-column prop="type_desc" label="类型" min-width="100" />
                <el-table-column prop="command" label="命令" min-width="100" />
                <el-table-column prop="params" label="参数" min-width="80" />
                <el-table-column prop="expression" label="规则" min-width="100" />
                <el-table-column prop="status" label="状态" min-width="100">
                    <template #default="{ row }">
                        <el-tag v-if="row.status == 1" type="success">运行中</el-tag>
                        <el-tag v-if="row.status == 2" type="info">已停止</el-tag>
                        <el-tag v-if="row.status == 3" type="danger">错误</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="error" label="错误原因" min-width="120" />
                <el-table-column prop="last_time" label="最后执行时间" width="180" />
                <el-table-column prop="time" label="时长" min-width="100" />
                <el-table-column prop="max_time" label="最大时长" min-width="100" />

                <el-table-column label="操作" width="120" fixed="right">
                    <template #default="{ row }">
                        <div class="flex">
                            <el-button type="primary" link>
                                <router-link
                                    v-perms="['crontab.crontab/edit', 'crontab.crontab/add:edit']"
                                    :to="{
                                        path: getRoutePath('crontab.crontab/add:edit'),
                                        query: {
                                            id: row.id
                                        }
                                    }"
                                >
                                    <el-button type="primary" link> 编辑 </el-button>
                                </router-link>
                            </el-button>
                            <el-button
                                v-perms="['crontab.crontab/delete']"
                                type="danger"
                                link
                                @click="handleDelete(row.id)"
                            >
                                删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <div class="flex justify-end mt-4">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup name="scheduledTask">
import { crontabDel, crontabLists } from '@/api/setting/system'
import { usePaging } from '@/hooks/usePaging'
import { getRoutePath } from '@/router'
import feedback from '@/utils/feedback'

const { pager, getLists } = usePaging({
    fetchFun: crontabLists,
    params: {}
})

const handleDelete = async (id: number) => {
    await feedback.confirm('确定要删除？')
    await crontabDel({ id })
    getLists()
}

getLists()
</script>

<style lang="scss"></style>

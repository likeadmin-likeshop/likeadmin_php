<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-alert
                type="warning"
                title="温馨提示：设置系统支持的支付方式"
                :closable="false"
                show-icon
            />
        </el-card>
        <el-card shadow="never" class="mt-4 !border-none">
            <div>
                <el-table :data="payConfigList">
                    <el-table-column prop="pay_way_name" label="支付方式" min-width="150" />
                    <el-table-column prop="name" label="显示名称" min-width="150" />
                    <el-table-column label="图标" min-width="150">
                        <template #default="{ row }">
                            <el-image
                                :src="row.icon"
                                alt="图标"
                                style="width: 34px; height: 34px"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" label="排序" min-width="150" />
                    <el-table-column label="操作" min-width="80" fixed="right">
                        <!-- 操作 -->
                        <template #default="{ row }">
                            <el-button
                                v-perms="['setting.pay.pay_config/setConfig']"
                                link
                                type="primary"
                                @click="handleEdit(row)"
                            >
                                配置
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <edit-popup v-if="showEdit" ref="editRef" @success="getConfig" @close="showEdit = false" />
        <Edit ref="editNewRef" @refresh="getConfig" />
    </div>
</template>

<script lang="ts" setup>
import { getPayConfigLists } from '@/api/setting/pay'
import { useComponentRef } from '@/utils/getExposeType'

import Edit from './edit.vue'

const editNewRef = useComponentRef(Edit)

import EditPopup from './edit.vue'

const payConfigList = ref<any[]>([])
const editRef = shallowRef<InstanceType<typeof EditPopup>>()
const showEdit = ref(false)
const getConfig = async () => {
    const { lists } = await getPayConfigLists()
    payConfigList.value = lists
}
const handleEdit = async (data: any) => {
    editNewRef.value?.openHandle(data.id, false)
}
getConfig()
</script>

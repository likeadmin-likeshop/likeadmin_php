<template>
    <div class="code-preview">
        <el-dialog v-model="modelValue" width="1000px" title="代码预览">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane
                    v-for="(item, index) in code"
                    :label="item.name"
                    :name="`index${index}`"
                    :key="index"
                >
                    <div class="flex">
                        <el-scrollbar class="flex-1" style="height:70vh;">
                            <div class="content">{{ item.content }}</div>
                        </el-scrollbar>
                        <div>
                            <el-button @click="handleCopy(item.content)" type="text" :icon="CopyDocument">复制</el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { copyClipboard } from '@/utils/util'
import { CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive, ref, shallowRef, watch } from 'vue'
const props = defineProps<{
    modelValue: boolean
    code: any[]
}>()

const activeName = ref('index0')

const handleCopy = (text: string) => {
    copyClipboard(text).then(() => {
        ElMessage.success('复制成功')
    }).catch(() => {
        ElMessage.error('复制失败')
    })
}

</script>

<style lang="scss" scoped>
.content {
    white-space: pre-wrap;
}
</style>
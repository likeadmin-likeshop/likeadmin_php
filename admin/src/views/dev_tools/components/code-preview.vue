<template>
    <div class="code-preview">
        <el-dialog v-model="show" width="1000px" title="代码预览">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane
                    v-for="(item, index) in code"
                    :label="item.name"
                    :name="`index${index}`"
                    :key="index"
                >
                    <div class="flex">
                        <el-scrollbar class="flex-1" style="height:70vh;">
                            <pre v-html="highlightedCode(item.content, item.name)"></pre>
                        </el-scrollbar>
                        <div>
                            <el-button
                                @click="handleCopy(item.content)"
                                type="text"
                                :icon="CopyDocument"
                            >复制</el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { computed, reactive, ref, shallowRef, watch } from 'vue'
import useClipboard from 'vue-clipboard3'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import ts from 'highlight.js/lib/languages/typescript'
import php from 'highlight.js/lib/languages/php'
hljs.registerLanguage("php", php)
hljs.registerLanguage("ts", ts);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("vue", xml);
hljs.registerLanguage("javascript", javascript)
import "highlight.js/styles/github.css"

const props = defineProps<{
    modelValue: boolean
    code: any[]
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
}>()
const { toClipboard } = useClipboard()

const activeName = ref('index0')

const handleCopy = async (text: string) => {
    try {
        await toClipboard(text)
        ElMessage.success('复制成功')
    } catch (e) {
        ElMessage.error('复制失败')
    }
}

const show = computed<boolean>({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})


const highlightedCode = (code: string, key: string) => {
    const index = key.indexOf(".")
    var language = key.slice(index + 1)
    const result = hljs.highlight(language, code, true)
    return result.value || '&nbsp;'
}

</script>


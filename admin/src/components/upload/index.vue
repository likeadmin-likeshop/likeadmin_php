<template>
    <div class="upload">
        <el-upload
            ref="uploadRefs"
            :action="action"
            :multiple="multiple"
            :limit="limit"
            :show-file-list="false"
            :headers="headers"
            :data="data"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :on-exceed="handleExceed"
            :on-error="handleError"
        >
            <slot></slot>
        </el-upload>
        <el-dialog
            v-if="showProgress && fileList.length"
            v-model="visible"
            title="上传进度"
            :close-on-click-modal="false"
            width="500px"
            :modal="false"
            :before-close="handleClose"
        >
            <div class="file-list">
                <template v-for="(item, index) in fileList" :key="index">
                    <div class="m-b-20">
                        <div>{{ item.name }}</div>
                        <div class="flex-1">
                            <el-progress :percentage="parseInt(item.percentage)"></el-progress>
                        </div>
                    </div>
                </template>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue'
import { ElMessage, ElUpload } from 'element-plus'
import { useStore } from '@/store'
import { version } from '@/config/app'
export default defineComponent({
    components: {},
    props: {
        // 上传文件类型
        type: {
            type: String,
            default: 'image'
        },
        // 是否支持多选
        multiple: {
            type: Boolean,
            default: true
        },
        // 多选时最多选择几条
        limit: {
            type: Number,
            default: 10
        },
        // 上传时的额外参数
        data: {
            type: Object,
            default: () => ({})
        },
        // 是否显示上传进度
        showProgress: {
            type: Boolean,
            default: false
        }
    },
    emits: ['change', 'error'],
    setup(props, { emit }) {
        const store = useStore()
        const uploadRefs: Ref<typeof ElUpload | null> = ref(null)
        const action = ref(`${import.meta.env.VITE_APP_BASE_URL}/adminapi/upload/${props.type}`)
        const headers = computed(() => ({
            token: store.getters.token,
            version: version
        }))
        const visible = ref(false)
        const fileList: Ref<any[]> = ref([])

        const handleProgress = (event: any, file: any, fileLists: any[]) => {
            visible.value = true
            fileList.value = fileLists
        }

        const handleSuccess = (event: any, file: any, fileLists: any[]) => {
            const allSuccess = fileLists.every(item => item.status == 'success')
            if (allSuccess) {
                uploadRefs.value?.clearFiles()
                visible.value = false
                emit('change')
            }
        }
        const handleError = (event: any, file: any, fileLists: any[]) => {
            ElMessage.error(`${file.name}文件上传失败`)
            uploadRefs.value?.abort()
            visible.value = false
            emit('change')
            emit('error')
        }
        const handleExceed = () => {
            ElMessage.error('超出上传上限，请重新上传')
        }
        const handleClose = () => {
            uploadRefs.value?.abort()
            uploadRefs.value?.clearFiles()
            visible.value = false
        }
        return {
            uploadRefs,
            action,
            headers,
            visible,
            fileList,
            handleProgress,
            handleSuccess,
            handleError,
            handleExceed,
            handleClose
        }
    }
})
</script>

<style lang="scss"></style>

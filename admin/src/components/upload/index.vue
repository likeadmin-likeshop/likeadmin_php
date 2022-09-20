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
            @close="handleClose"
        >
            <div class="file-list p-4">
                <template v-for="(item, index) in fileList" :key="index">
                    <div class="mb-5">
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
import { computed, defineComponent, ref, shallowRef } from 'vue'
import useUserStore from '@/stores/modules/user'
import config from '@/config'
import feedback from '@/utils/feedback'
import type { ElUpload } from 'element-plus'
import { RequestCodeEnum } from '@/enums/requestEnums'
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
        const userStore = useUserStore()
        const uploadRefs = shallowRef<InstanceType<typeof ElUpload>>()
        const action = ref(`${config.baseUrl}${config.urlPrefix}/common/upload/${props.type}`)
        const headers = computed(() => ({
            token: userStore.token,
            version: config.version
        }))
        const visible = ref(false)
        const fileList = ref<any[]>([])

        const handleProgress = (event: any, file: any, fileLists: any[]) => {
            visible.value = true
            fileList.value = toRaw(fileLists)
        }

        const handleSuccess = (response: any, file: any, fileLists: any[]) => {
            const allSuccess = fileLists.every((item) => item.status == 'success')
            if (allSuccess) {
                uploadRefs.value?.clearFiles()
                visible.value = false
                emit('change')
            }
            if (response.code == RequestCodeEnum.FAILED && response.msg) {
                feedback.msgError(response.msg)
            }
        }
        const handleError = (event: any, file: any) => {
            feedback.msgError(`${file.name}文件上传失败`)
            uploadRefs.value?.abort(file)
            visible.value = false
            emit('change')
            emit('error')
        }
        const handleExceed = () => {
            feedback.msgError('超出上传上限，请重新上传')
        }
        const handleClose = () => {
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

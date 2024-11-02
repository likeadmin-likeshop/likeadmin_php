<template>
    <div class="upload">
        <el-upload
            v-model:file-list="fileList"
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
            :accept="getAccept"
        >
            <slot />
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
                            <el-progress :percentage="parseInt(item.percentage)" />
                        </div>
                    </div>
                </template>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import type { ElUpload } from 'element-plus'
import { computed, defineComponent, ref, shallowRef } from 'vue'

import config from '@/config'
import { RequestCodeEnum } from '@/enums/requestEnums'
import useAppStore from '@/stores/modules/app'
import useUserStore from '@/stores/modules/user'
import feedback from '@/utils/feedback'

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
    emits: ['change', 'error', 'success', 'allSuccess'],
    setup(props, { emit }) {
        const userStore = useUserStore()
        const appStore = useAppStore()
        const uploadRefs = shallowRef<InstanceType<typeof ElUpload>>()
        const action = ref(`${config.baseUrl}${config.urlPrefix}/upload/${props.type}`)
        const headers = computed(() => ({
            token: userStore.token,
            version: appStore.config.version
        }))
        const visible = ref(false)
        const fileList = ref<any[]>([])

        const handleProgress = () => {
            visible.value = true
        }
        let uploadLen = 0
        const handleSuccess = (response: any, file: any) => {
            uploadLen++
            if (uploadLen == fileList.value.length) {
                uploadLen = 0
                fileList.value = []
                emit('allSuccess')
            }
            emit('change', file)
            if (response.code == RequestCodeEnum.SUCCESS) {
                emit('success', response)
            }
            if (response.code == RequestCodeEnum.FAIL && response.msg) {
                feedback.msgError(response.msg)
            }
        }
        const handleError = (event: any, file: any) => {
            uploadLen++
            if (uploadLen == fileList.value.length) {
                uploadLen = 0
                fileList.value = []
                emit('allSuccess')
            }
            feedback.msgError(`${file.name}文件上传失败`)
            uploadRefs.value?.abort(file)
            visible.value = false
            emit('change', file)
            emit('error', file)
        }
        const handleExceed = () => {
            feedback.msgError(`超出上传上限${props.limit}，请重新上传`)
        }
        const handleClose = () => {
            fileList.value = []
            visible.value = false
        }

        const getAccept = computed(() => {
            switch (props.type) {
                case 'image':
                    return '.jpg,.png,.gif,.jpeg,.ico'
                case 'video':
                    return '.wmv,.avi,.mpg,.mpeg,.3gp,.mov,.mp4,.flv,.rmvb,.mkv'
                default:
                    return '*'
            }
        })
        return {
            uploadRefs,
            action,
            headers,
            visible,
            fileList,
            getAccept,
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

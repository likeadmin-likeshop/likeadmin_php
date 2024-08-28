<template>
    <div>
        <el-card header="基础使用" shadow="never" class="!border-none">
            <div class="flex flex-wrap">
                <div class="m-4">
                    <upload
                        @change="onChange"
                        @success="onSuccess"
                        @error="onError"
                        :show-progress="true"
                    >
                        <el-button type="primary">上传图片</el-button>
                    </upload>
                </div>
                <div class="m-4">
                    <upload
                        type="video"
                        @change="onChange"
                        @success="onSuccess"
                        @error="onError"
                        :show-progress="true"
                    >
                        <el-button type="primary">上传视频</el-button>
                    </upload>
                </div>
                <div class="m-4">
                    <upload
                        :multiple="false"
                        @change="onChange"
                        @success="onSuccess"
                        @error="onError"
                        :show-progress="true"
                    >
                        <el-button type="primary">取消多选</el-button>
                    </upload>
                </div>
                <div class="m-4">
                    <upload
                        :limit="2"
                        @change="onChange"
                        @success="onSuccess"
                        @error="onError"
                        :show-progress="true"
                    >
                        <el-button type="primary">一次最多上传2张</el-button>
                    </upload>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import Upload from '@/components/upload/index.vue'

const onChange = (file: any) => {
    console.log('上传文件的状态发生改变', file)
}

const onSuccess = (file: any) => {
    console.log('上传文件成功', file)
}

const onError = (file: any) => {
    console.log('上传文件失败', file)
}
</script>

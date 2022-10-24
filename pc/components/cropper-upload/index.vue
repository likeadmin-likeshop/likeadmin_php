<template>
    <ClientOnly>
        <div>
            <ElUpload
                ref="uploadRef"
                :show-file-list="false"
                :limit="1"
                :on-change="handleChange"
                :auto-upload="false"
            >
                <slot />
            </ElUpload>
            <ElDialog
                v-model="state.cropperVisible"
                :append-to-body="true"
                :close-on-click-modal="false"
                :width="600"
                @close="state.cropperVisible = false"
            >
                <div class="h-[400px]">
                    <VueCropper
                        ref="vueCropperRef"
                        :img="state.imagePath"
                        :autoCrop="true"
                        :auto-crop-height="200"
                        :auto-crop-width="200"
                        output-type="png"
                    />
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <ElButton @click="handleConfirmCropper">
                            确认裁剪
                        </ElButton>
                    </span>
                </template>
            </ElDialog>
        </div>
    </ClientOnly>
</template>
<script lang="ts" setup>
import { ElUpload, ElDialog, ElButton } from 'element-plus'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { uploadImage } from '~~/api/app'
const emit = defineEmits(['change'])
const vueCropperRef = shallowRef()
const uploadRef = shallowRef<InstanceType<typeof ElUpload>>()

const state = reactive({
    cropperVisible: false,
    imagePath: ''
})

const handleChange = (rawFile) => {
    const URL = window.URL || window.webkitURL
    state.imagePath = URL.createObjectURL(rawFile.raw)
    state.cropperVisible = true
}
const handleConfirmCropper = () => {
    vueCropperRef.value?.getCropBlob(async (file) => {
        const fileName = `file.${file.type.split('/')[1]}`
        const imgFile = new window.File([file], fileName, {
            type: file.type
        })
        const data = await uploadImage({ file: imgFile })
        state.cropperVisible = false
        emit('change', data.uri)
        uploadRef.value?.clearFiles()
    })
}
</script>
<style lang="scss" scoped></style>

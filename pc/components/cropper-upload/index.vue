<template>
    <ClientOnly>
        <div>
            <ElUpload
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
                @closed="state.cropperVisible = false"
            >
                <div class="h-[400px]">
                    <VueCropper
                        ref="vueCropperRef"
                        :img="state.imagePath"
                        :autoCrop="true"
                        :auto-crop-height="200"
                        :auto-crop-width="200"
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
const vueCropperRef = shallowRef()
const state = reactive({
    cropperVisible: false,
    imagePath: ''
})

const handleChange = (rawFile) => {
    const URL = window.URL || window.webkitURL
    state.imagePath = URL.createObjectURL(rawFile.raw)
    uploadImage({ file: rawFile.raw })
    state.cropperVisible = true
}
const handleConfirmCropper = () => {
    vueCropperRef.value?.getCropBlob((data) => {
        console.log(data)

        const imgFile = new window.File([data], String(Math.random()), {
            type: data.type
        })
    })
}
</script>
<style lang="scss" scoped></style>

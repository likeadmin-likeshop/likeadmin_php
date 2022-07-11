<template>
    <div v-show="modelValue">
        <div v-if="type == 'image'">
            <el-image-viewer :url-list="[url]" hide-on-click-modal @close="handleClose" />
        </div>
        <div v-if="type == 'video'">
            <el-dialog v-model="modelValue" width="740px" title="视频预览" :before-close="handleClose">
                <video-player :src="url" width="700px" height="450px" />
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'image'
    }
})
const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
}>()
const handleClose = () => {
    emit('update:modelValue', false)
}


</script>
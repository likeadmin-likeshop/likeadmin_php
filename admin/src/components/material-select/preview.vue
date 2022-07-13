<template>
    <div v-show="modelValue">
        <div v-if="type == 'image'">
            <el-image-viewer
                v-if="previewLists.length"
                :url-list="previewLists"
                hide-on-click-modal
                @close="handleClose"
            />
        </div>
        <div v-if="type == 'video'">
            <el-dialog v-model="modelValue" width="740px" title="视频预览" :before-close="handleClose">
                <video-player ref="playerRef" :src="url" width="700px" height="450px" />
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, shallowRef, watch } from 'vue'
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

const playerRef = shallowRef()

const handleClose = () => {
    emit('update:modelValue', false)
}

const previewLists = ref<any[]>([])

watch(() => props.modelValue, (value) => {
    if (value) {
        nextTick(() => {
            previewLists.value = [props.url]
            playerRef.value?.play()
        })
    } else {
        nextTick(() => {
            previewLists.value = []
            playerRef.value?.pause()
        })
    }
})


</script>
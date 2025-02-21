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
            <el-dialog v-model="visible" width="740px" title="视频预览" :before-close="handleClose">
                <div class="aspect-video overflow-hidden">
                    <video class="size-full" controls>
                        <source :src="url" type="video/mp4" />
                    </video>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
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

const visible = computed({
    get() {
        return props.modelValue
    },

    set(value) {
        emit('update:modelValue', value)
    }
})

const handleClose = () => {
    emit('update:modelValue', false)
}

const previewLists = ref<any[]>([])

watch(
    () => props.modelValue,
    (value) => {
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
    }
)
</script>

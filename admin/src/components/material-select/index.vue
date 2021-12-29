
<template>
    <popup
        class="material-select"
        ref="popupRef"
        width="900px"
        :title="`选择${tipsText}`"
        @confirm="handleConfirm"
    >
        <template #trigger>
            <div class="material-select__trigger clearfix" @click.stop>
                <draggable class="draggable" v-model="fileList" animation="300">
                    <template v-slot:item="{ item, index }">
                        <div
                            class="material-preview"
                            :class="{
                                'is-disabled': disabled,
                                'is-one': limit == 1,
                            }"
                            @click="showPopup(index)"
                        >
                            <file-item :item="item" :size="size" />
                        </div>
                    </template>
                </draggable>
                <div
                    class="material-upload"
                    @click="showPopup(-1)"
                    :class="{
                        'is-disabled': disabled,
                        'is-one': limit == 1,
                    }"
                >
                    <slot name="upload">
                        <div
                            class="upload-btn flex flex-col flex-center"
                            :style="{
                                width: size,
                                height: size,
                            }"
                        >
                            <el-icon :size="25"><plus /></el-icon>
                            <span>添加</span>
                        </div>
                    </slot>
                </div>
            </div>
        </template>
        <div class="material-wrap">
            <material :file-size="fileSize" />
        </div>
    </popup>
</template>


<script lang="ts">
import { provide, reactive, defineComponent, computed, ref, Ref } from 'vue'
import Draggable from 'vuedraggable'
import Popup from '@/components/popup/index.vue'
import FileItem from './file-item.vue'
import Material from './material.vue'
export default defineComponent({
    components: {
        Popup,
        Draggable,
        FileItem,
        Material,
    },
    emits: [],
    props: {
        // 文件类型
        type: {
            type: String,
            default: 'image',
        },
        // 选择器尺寸
        size: {
            type: String,
            default: '100px',
        },
        // 文件尺寸
        fileSize: {
            type: String,
            default: '100px',
        },
        // 选择数量限制
        limit: {
            type: Number,
            default: 1,
        },
        // 禁用选择
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const popupRef: Ref<typeof Popup | null> = ref(null)
        const fileList = reactive([])
        const tipsText = computed(() => {
            switch (props.type) {
                case 'image':
                    return '图片'
                case 'video':
                    return '视频'
            }
        })
        const typeValue = computed(() => {
            switch (props.type) {
                case 'image':
                    return 10
                case 'video':
                    return 20
                case 'file':
                    return 30
            }
        })
        const handleConfirm = () => {}
        const showPopup = (index: number) => {
            popupRef.value?.open()
        }
        provide('type', props.type)
        provide('fileSize', props.fileSize)
        provide('limit', props.limit)
        provide('typeValue', typeValue)
        return {
            popupRef,
            fileList,
            tipsText,
            handleConfirm,
            showPopup,
        }
    },
})
</script>

<style scoped lang="scss">
.material-select {
    :deep(.el-dialog__body) {
        padding: 0;
    }
    .material-upload,
    .material-preview {
        border-radius: 4px;
        cursor: pointer;
        color: $color-text-secondary;
        margin-right: 8px;
        margin-bottom: 8px;
        box-sizing: border-box;
        float: left;
        &.is-disabled {
            cursor: not-allowed;
        }
        &.is-one {
            margin-bottom: 0;
        }
    }
    .material-upload {
        .upload-btn {
            box-sizing: border-box;
            border-radius: 4px;
            border: 1px dashed #d7d7d7;
        }
    }
    .material-wrap {
        height: 500px;
        border-top: 1px solid $border-color-base;
        border-bottom: 1px solid $border-color-base;
    }
}
</style>

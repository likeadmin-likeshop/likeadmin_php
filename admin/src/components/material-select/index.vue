
<template>
    <div class="material-select">
        <popup width="1050px" @confirm="handleConfirm">
            <template #trigger>
                <div class="material-select__trigger clearfix" @click.stop>
                    <draggable
                        class="draggable"
                        v-model="fileList"
                        animation="300"
                    >
                        <template v-slot:item="{ item }">
                            <div class="material-preview">
                                <file-item :item="item" />
                            </div>
                        </template>
                    </draggable>
                    <div
                        class="material-upload"
                        :class="{
                            'is-disabled': disabled,
                            'is-one': limit == 1,
                        }"
                    >
                        <slot name="upload">
                            <div
                                class="upload-btn flex flex-col flex-center"
                                :style="{
                                    width: fileSize,
                                    height: fileSize,
                                }"
                            >
                                <el-icon :size="25"><plus /></el-icon>
                                <span>添加</span>
                            </div>
                        </slot>
                    </div>
                </div>
            </template>
        </popup>
    </div>
</template>


<script lang="ts">
import { provide, reactive, defineComponent } from 'vue'
import Draggable from 'vue3-draggable'
import Popup from '@/components/popup.vue'
import FileItem from './file-item.vue'
export default defineComponent({
    components: {
        Popup,
        Draggable,
        FileItem,
    },
    emits: [],
    props: {
        // 文件类型
        type: {
            type: String,
            default: 'image',
        },
        // 选择器大小
        fileSize: {
            type: String,
            default: '100px',
        },
        // 选择数量限制
        limit: {
            type: Number,
            default: 1,
        },
    },
    setup(props) {
        const fileList = reactive([
            {
                uri: 1,
            },
        ])
        provide('type', props.type)
        provide('fileSize', props.fileSize)
        return {
            fileList,
        }
    },
})
</script>

<style scoped lang="scss">
.material-select {
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
            border: 1px dashed #d7d7d7;
            &:hover {
                border-color: $color-primary;
            }
        }
    }
}
</style>

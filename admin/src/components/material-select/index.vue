
<template>
    <div class="material-select">
        <popup
            ref="popupRef"
            width="950px"
            custom-class="body-padding"
            :title="`选择${tipsText}`"
            @confirm="handleConfirm"
        >
            <template v-if="!hiddenUpload" #trigger>
                <div class="material-select__trigger clearfix" @click.stop>
                    <draggable
                        class="draggable"
                        v-model="fileList"
                        animation="300"
                        item-key="id"
                    >
                        <template v-slot:item="{ element, index }">
                            <div
                                class="material-preview"
                                :class="{
                                    'is-disabled': disabled,
                                    'is-one': limit == 1,
                                }"
                                @click="showPopup(index)"
                            >
                                <file-item :uri="element" :file-size="size" @close="deleteImg(index)" />
                            </div>
                        </template>
                    </draggable>
                    <div
                        class="material-upload"
                        @click="showPopup(-1)"
                        v-show="showUpload"
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
                <material
                    ref="materialRefs"
                    :file-size="fileSize"
                    :limit="meterialLimit"
                    @change="selectChange"
                />
            </div>
        </popup>
    </div>
</template>


<script lang="ts">
import {
    provide,
    reactive,
    defineComponent,
    computed,
    ref,
    Ref,
    toRef,
    toRefs,
    watch,
    nextTick,
} from 'vue'
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
    props: {
        modelValue: {
            type: [String, Array],
            default: () => [],
        },
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
            // type: Number,
            default: 1,
        },
        // 禁用选择
        disabled: {
            type: Boolean,
            default: false,
        },
        // 隐藏上传框*(目前在富文本中使用到)
        hiddenUpload: {
            type: Boolean,
            default: false,
        }
    },

    emits: ['change', 'update:modelValue'],
    setup(props, { emit }) {
        const popupRef: Ref<typeof Popup | null> = ref(null)
        const materialRefs: Ref<typeof Material | null> = ref(null)
        const fileList: Ref<any[]> = ref([])
        const select: Ref<any[]> = ref([])
        const isAdd = ref(true)
        const currentIndex = ref(-1)
        const { disabled, limit, modelValue } = toRefs(props)
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
        const showUpload = computed(() => {
            return props.limit - fileList.value.length > 0
        })
        const meterialLimit: any = computed(() => {
            if (!isAdd.value) {
                return 1
            }
            if (!limit.value) return null
            return limit.value - fileList.value.length
        })
        const handleConfirm = () => {
            const selectUri = select.value.map((item) => item.uri)
            if (!isAdd.value) {
                fileList.value.splice(currentIndex.value, 1, selectUri.shift())
            } else {
                fileList.value = [...fileList.value,...selectUri]
            }
            handleChange()
        }
        const showPopup = (index: number) => {
            if (disabled.value) return
            if (index >= 0) {
                isAdd.value = false
                currentIndex.value = index
            } else {
                isAdd.value = true
            }
            popupRef.value?.open()
        }

        const selectChange = (val: any[]) => {
            select.value = val
        }
        const handleChange = () => {
            const valueImg =
                limit.value != 1 ? fileList.value : fileList.value[0] || ''
            emit('update:modelValue', valueImg)
            emit('change', valueImg)
            nextTick(() => {
                materialRefs.value?.clearSelect()
            })
        }

        const deleteImg = (index: number) => {
            fileList.value.splice(index, 1)
            handleChange()
        }

        watch(modelValue, (val: any[] | string) => {
            fileList.value = Array.isArray(val) ? val : val == '' ? [] : [val]
        })
        provide('type', props)
        provide('fileSize', props.fileSize)
        provide('limit', props.limit)
        provide('typeValue', typeValue)
        provide('hiddenUpload', props.hiddenUpload)
        return {
            popupRef,
            materialRefs,
            fileList,
            tipsText,
            handleConfirm,
            meterialLimit,
            showUpload,
            showPopup,
            selectChange,
            deleteImg
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
            border-radius: 4px;
            border: 1px dashed #d7d7d7;
        }
    }
}
.material-wrap {
    height: 540px;
    border-top: 1px solid $border-color-base;
    border-bottom: 1px solid $border-color-base;
}
</style>

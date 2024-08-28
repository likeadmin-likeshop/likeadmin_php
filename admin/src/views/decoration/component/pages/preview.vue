<template>
    <el-scrollbar class="pages-preview-container">
        <div v-if="pageMeta !== null" class="absolute right-4 top-4" @click="handleClickPageMeta">
            <el-button>页面设置</el-button>
        </div>
        <div class="shadow mx-[30px] pages-preview">
            <div
                v-for="(widget, index) in pageData"
                :key="widget.id"
                class="relative"
                :class="{
                    'cursor-pointer': !widget?.disabled
                }"
                @click="handleClick(widget, index)"
            >
                <!--  选中的边框  -->
                <div
                    class="absolute w-full h-full z-[100] border-dashed"
                    :class="{
                        select: index == modelValue,
                        hide: canShowCom(widget.content),
                        'border-[#dcdfe6] border-2': !widget?.disabled
                    }"
                ></div>
                <!--  选中的组件  -->
                <slot>
                    <component
                        :is="widgets[widget?.name]?.content"
                        :content="widget.content"
                        :styles="widget.styles"
                        :key="widget.id"
                    />
                </slot>
                <!--  部件操作按钮组  -->
                <div class="widget-btns py-[5px]" v-if="index == modelValue">
                    <div>
                        <el-tooltip
                            effect="dark"
                            :content="canShowCom(widget.content) ? '显示' : '隐藏'"
                            placement="right"
                        >
                            <el-button
                                class="py-[5px]"
                                type="primary"
                                :icon="canShowCom(widget.content) ? View : Hide"
                                @click="changeShowCom(widget.content)"
                            />
                        </el-tooltip>
                    </div>
                    <div>
                        <el-tooltip effect="dark" content="上移" placement="right">
                            <el-button
                                class="py-[5px]"
                                type="primary"
                                :icon="ArrowUpBold"
                                :disabled="canMoveUpCom(index)"
                                @click.stop="rearrangeArray(index, index - 1)"
                            />
                        </el-tooltip>
                    </div>
                    <div>
                        <el-tooltip effect="dark" content="下移" placement="right">
                            <el-button
                                class="py-[5px]"
                                type="primary"
                                :icon="ArrowDownBold"
                                :disabled="canMoveDownCom(index)"
                                @click.stop="rearrangeArray(index, index + 1)"
                            />
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
    </el-scrollbar>
</template>
<script lang="ts" setup>
import { ArrowDownBold, ArrowUpBold, Hide, View } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import type { PropType } from 'vue'
import { computed } from 'vue'

import widgets from '../widgets'

const props = defineProps({
    pageMeta: {
        type: Object as any,
        default: () => null
    },
    pageData: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    modelValue: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits<{
    (event: 'update:modelValue', value: number): void
    (event: 'updatePageData', value: any[]): void
}>()

const oldModelValue = ref<number>(-1)

const handleClickPageMeta = () => {
    if (props.modelValue === -1) {
        emit('update:modelValue', oldModelValue.value)
    } else {
        oldModelValue.value = props.modelValue
        emit('update:modelValue', -1)
    }
}

const handleClick = (widget: any, index: number) => {
    if (widget.disabled) return
    emit('update:modelValue', index)
}

// 是否可以移动组件
const canMoveUpCom = computed(() => {
    return (index: number) => {
        return index === 0
    }
})

// 是否可以移动组件
const canMoveDownCom = computed(() => {
    return (index: number) => {
        return props.pageData?.length === index + 1
    }
})

// 是否显示组件
const canShowCom = computed(() => {
    return (data: any) => {
        return data?.enabled == 0
    }
})

// 修改组件显示/隐藏
const changeShowCom = (data: any) => {
    if (data.enabled === undefined) return
    data.enabled = data.enabled ? 0 : 1
}

const rearrangeArray = (currentIdx: number, targetIdx: number) => {
    if (
        currentIdx < 0 ||
        currentIdx >= props.pageData.length ||
        targetIdx < 0 ||
        targetIdx >= props.pageData.length
    ) {
        return
    }

    // const element = props.pageData.splice(currentIdx, 1)[0]
    // props.pageData.splice(targetIdx, 0, element)
    const newPageData = cloneDeep(props.pageData)
    const element = newPageData.splice(currentIdx, 1)[0]
    newPageData.splice(targetIdx, 0, element)

    emit('updatePageData', newPageData)
    emit('update:modelValue', targetIdx)
}
</script>

<style lang="scss" scoped>
.pages-preview-container {
    position: relative;
    :deep(.el-scrollbar__wrap) {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .pages-preview {
        background-color: #f8f8f8;
        width: 360px;
        min-height: 615px;
        color: #333;

        .select {
            @apply border-primary border-solid;
        }

        .hide::before {
            content: '已隐藏';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 14px;
            background-color: rgba(0, 0, 0, 0.4);
        }

        .widget-btns {
            position: absolute;
            top: 10px;
            right: -60px;
            overflow: hidden;

            width: 46px;
            border-radius: 8px;
            @apply bg-primary;

            :deep(.el-button) {
                width: 46px;
                border-radius: 0;
            }
        }
    }
}
</style>

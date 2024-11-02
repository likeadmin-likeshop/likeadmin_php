<template>
    <div class="pages-preview">
        <div class="relative flex justify-center h-full mt-5 mx-10">
            <!--    iframe预览    -->
            <iframe
                v-if="$route.query.url"
                ref="previewIframeRef"
                class="flex-1 h-full"
                width="100%"
                height="100%"
                scrolling="no"
                :src="$route.query.url as string"
            ></iframe>
            <div class="max-w-[1200px] w-full absolute">
                <div
                    v-for="(widget, index) in pageData"
                    :key="widget.id"
                    class="absolute left-0 top-0"
                    :class="{
                        'cursor-pointer': !widget?.disabled
                    }"
                    @click="handleClick(widget, index)"
                >
                    <div
                        class="absolute w-full h-full z-[100] border-dashed"
                        :class="{
                            select: index == modelValue,
                            'border-[#dcdfe6] border-2': !widget?.disabled,
                            hide: canShowCom(widget.content)
                        }"
                        :style="widget.styles"
                    ></div>
                    <slot>
                        <component
                            :is="widgets[widget?.name]?.content"
                            :content="widget.content"
                            :styles="widget.styles"
                            :key="widget.id"
                            ref="commonComponentRef"
                        />
                    </slot>
                    <!--  部件操作按钮组  -->
                    <div
                        class="widget-btns py-[5px]"
                        v-if="index == modelValue"
                        :style="{
                            top: widget.styles.top,
                            left: widget.styles.width
                        }"
                    >
                        <div>
                            <el-tooltip effect="dark" content="编辑组件内容" placement="right">
                                <el-button
                                    class="py-[5px]"
                                    type="primary"
                                    :icon="Setting"
                                    @click="handleClickSetting(index)"
                                />
                            </el-tooltip>
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Hide, Setting, View } from '@element-plus/icons-vue'
import type { PropType } from 'vue'

import widgets from '../widgets'

const commonComponentRef = shallowRef<any>()

defineProps({
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
}>()

// 是否显示组件
const canShowCom = computed(() => {
    return (data: any) => {
        return data?.enabled == 0
    }
})

// 点击了组件设置
const handleClickSetting = (index: number) => {
    commonComponentRef.value[index]?.open()
}

// 修改组件显示/隐藏
const changeShowCom = (data: any) => {
    if (data.enabled === undefined) return
    data.enabled = data.enabled ? 0 : 1
}

const handleClick = (widget: any, index: number) => {
    if (widget.disabled) return
    emit('update:modelValue', index)
}
</script>

<style lang="scss" scoped>
.pages-preview {
    @apply w-full h-full relative;
    height: 85vh;

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
        overflow: hidden;

        width: 46px;
        border-radius: 8px;
        @apply bg-primary;
        margin-left: 10px;

        :deep(.el-button) {
            width: 46px;
            border-radius: 0;
        }
    }
}
</style>

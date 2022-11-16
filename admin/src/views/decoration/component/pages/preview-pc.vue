<template>
    <div class="pages-preview">
        <div
            v-for="(widget, index) in pageData"
            :key="widget.id"
            class="relative"
            :class="{
                'cursor-pointer': !widget?.disabled
            }"
            @click="handleClick(widget, index)"
        >
            <div
                class="absolute w-full h-full z-[100] border-dashed"
                :class="{
                    select: index == modelValue,
                    'border-[#dcdfe6] border-2': !widget?.disabled
                }"
                :style="widget.styles"
            ></div>
            <slot>
                <component
                    :is="widgets[widget?.name]?.content"
                    :content="widget.content"
                    :styles="widget.styles"
                    :key="widget.id"
                />
            </slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import widgets from '../widgets'
import type { PropType } from 'vue'

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

const handleClick = (widget: any, index: number) => {
    if (widget.disabled) return
    emit('update:modelValue', index)
}
</script>

<style lang="scss" scoped>
.pages-preview {
    width: 460px;
    height: 360px;
    background: url(../../image/pc_index.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .select {
        @apply border-primary border-solid;
    }
}
</style>

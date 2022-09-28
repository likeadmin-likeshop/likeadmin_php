<template>
    <div class="shadow mx-[30px] pages-preview">
        <el-scrollbar>
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
        </el-scrollbar>
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
    background-color: #f8f8f8;
    width: 360px;
    height: 615px;
    color: #333;
    .select {
        @apply border-primary border-solid;
    }
}
</style>

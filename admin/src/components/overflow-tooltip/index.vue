<template>
    <div>
        <el-tooltip v-bind="props" :disabled="disabled" placement="top" :teleported="false">
            <div ref="textRef" class="overflow-text truncate">{{ content }}</div>
        </el-tooltip>
    </div>
</template>

<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { useTooltipContentProps } from 'element-plus'

const props = defineProps(useTooltipContentProps)
const textRef = shallowRef<HTMLElement>()
const disabled = ref(false)

useEventListener(textRef, 'mouseenter', () => {
    if (textRef.value?.scrollWidth! > textRef.value?.offsetWidth!) {
        disabled.value = false
    } else {
        disabled.value = true
    }
})
</script>

<style></style>

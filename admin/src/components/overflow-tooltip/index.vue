<template>
    <div>
        <el-tooltip v-bind="props" :disabled="disabled">
            <div
                ref="textRef"
                class="overflow-text truncate"
                :style="{ textOverflow: overfloType }"
            >
                {{ content }}
            </div>
        </el-tooltip>
    </div>
</template>

<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { type Placement, useTooltipContentProps } from 'element-plus'
import type { PropType } from 'vue'

const props = defineProps({
    ...useTooltipContentProps,
    teleported: {
        type: Boolean,
        default: false
    },
    placement: {
        type: String as PropType<Placement>,
        default: 'top'
    },
    overfloType: {
        type: String as PropType<'ellipsis' | 'unset' | 'clip'>,
        default: 'ellipsis'
    }
})
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

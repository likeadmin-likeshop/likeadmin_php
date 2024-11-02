<template>
    <el-image :style="styles" v-bind="props"> </el-image>
</template>

<script lang="ts" setup>
import { imageProps } from 'element-plus'
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

import { addUnit } from '@/utils/util'

const props = defineProps({
    width: {
        type: [String, Number],
        default: 'auto'
    },
    height: {
        type: [String, Number],
        default: 'auto'
    },
    radius: {
        type: [String, Number],
        default: 0
    },
    ...imageProps
})

const styles = computed<CSSProperties>(() => {
    return {
        width: addUnit(props.width),
        height: addUnit(props.height),
        borderRadius: addUnit(props.radius)
    }
})
</script>

<style lang="scss" scoped>
.el-image {
    display: block;
    .el-image__error {
        @apply text-xs;
    }
}
</style>

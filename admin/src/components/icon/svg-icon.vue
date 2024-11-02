<template>
    <svg aria-hidden="true" :style="styles">
        <use :xlink:href="symbolId" fill="currentColor" />
    </svg>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'

import { addUnit } from '@/utils/util'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true
        },
        size: {
            type: [Number, String],
            default: 16
        },
        color: {
            type: String,
            default: 'inherit'
        }
    },
    setup(props) {
        const symbolId = computed(() => `#${props.name}`)
        const styles = computed<CSSProperties>(() => {
            return {
                width: addUnit(props.size),
                height: addUnit(props.size),
                color: props.color
            }
        })
        return { symbolId, styles }
    }
})
</script>

<template>
    <ElIcon v-bind="props" v-if="name.includes(EL_ICON_PREFIX)">
        <component :is="name" />
    </ElIcon>
    <span v-if="name.includes(LOCAL_ICON_PREFIX)" class="local-icon">
        <SvgIcon v-bind="props" />
    </span>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { EL_ICON_PREFIX, LOCAL_ICON_PREFIX } from '~~/plugins/icons'
import SvgIcon from './svg-icon.vue'
const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    size: {
        type: [String, Number],
        default: '14px'
    },
    color: {
        type: String,
        default: 'inherit'
    }
})
</script>

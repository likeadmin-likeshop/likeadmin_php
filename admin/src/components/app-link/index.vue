<template>
    <component :is="type" v-bind="linkProps">
        <slot />
    </component>
</template>

<script lang="ts" setup>
/**
 * @description 兼容第三方页面的跳转
 */
import { isExternal } from '@/utils/validate'

interface Props {
    to: string | Record<string, string>
    replace?: boolean
}
const props = defineProps<Props>()

const isExternalLink = computed(() => {
    return typeof props.to !== 'object' && isExternal(props.to)
})

const type = computed(() => {
    if (isExternalLink.value) {
        return 'a'
    }
    return 'router-link'
})

const linkProps = computed(() => {
    if (isExternalLink.value) {
        return {
            href: props.to,
            target: '_blank'
        }
    }
    return props
})
</script>

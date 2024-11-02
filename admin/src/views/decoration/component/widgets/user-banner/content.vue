<template>
    <div class="banner mx-[10px] mt-[10px]">
        <div class="banner-image">
            <decoration-img width="100%" height="100px" :src="getImage" fit="contain" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

import DecorationImg from '../../decoration-img.vue'
import type options from './options'

type OptionsType = ReturnType<typeof options>
const props = defineProps({
    content: {
        type: Object as PropType<OptionsType['content']>,
        default: () => ({})
    },
    styles: {
        type: Object as PropType<OptionsType['styles']>,
        default: () => ({})
    }
})
const showList = computed(() => {
    return props.content.data?.filter((item: any) => item.is_show == '1') || []
})
const getImage = computed(() => {
    if (Array.isArray(showList.value)) {
        return showList.value[0] ? showList.value[0].image : ''
    }
    return ''
})
</script>

<style lang="scss" scoped></style>

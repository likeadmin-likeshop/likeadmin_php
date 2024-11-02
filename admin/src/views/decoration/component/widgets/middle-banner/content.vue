<template>
    <div class="banner" :style="styles">
        <div class="banner-image w-full h-full">
            <decoration-img
                width="100%"
                :height="styles.height || height"
                :src="getImage"
                fit="contain"
            />
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
    },
    height: {
        type: String,
        default: '96px'
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

<template>
    <div class="nav bg-white pt-[15px] pb-[8px]">
        <div
            class="grid grid-rows-auto gap-y-3 w-full"
            :style="{ 'grid-template-columns': `repeat(${content.per_line}, 1fr)` }"
        >
            <div v-for="(item, index) in showList" :key="index" class="flex flex-col items-center">
                <decoration-img width="41px" height="41px" :src="item.image" alt="" />
                <div class="mt-[7px]">{{ item.name }}</div>
            </div>
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
    const data = props.content.data?.filter((item: any) => item.is_show == '1') || []
    return data.slice(0, props.content.show_line * props.content.per_line)
})
</script>

<style lang="scss" scoped></style>

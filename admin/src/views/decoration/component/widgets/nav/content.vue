<template>
    <div class="nav bg-white pt-[15px] pb-[8px]">
        <div class="flex flex-wrap">
            <div
                v-for="(item, index) in showList"
                :key="index"
                class="flex flex-col items-center w-1/5 mb-[15px]"
            >
                <decoration-img width="41px" height="41px" :src="item.image" alt="" />
                <div class="mt-[7px]">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import type options from './options'
import DecorationImg from '../../decoration-img.vue'
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
</script>

<style lang="scss" scoped></style>

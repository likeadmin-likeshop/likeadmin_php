<template>
    <div class="news">
        <div class="flex items-center news-title mx-[10px] my-[15px] text-[17px] font-medium">
            最新资讯
        </div>
        <div
            v-for="item in newsList"
            :key="item.id"
            class="news-card flex bg-white px-[10px] py-[16px] text-[#333] border-[#f2f2f2] border-b"
        >
            <div class="mr-[10px]" v-if="item.image">
                <img :src="item.image" class="w-[120px] h-[90px] object-contain" />
            </div>
            <div class="flex flex-col justify-between flex-1">
                <div class="text-[15px] font-medium line-clamp-2">{{ item.title }}</div>
                <div class="line-clamp-1 text-sm mt-[8px]">
                    {{ item.desc }}
                </div>

                <div class="text-[#999] text-xs w-full flex justify-between mt-[8px]">
                    <div>{{ item.create_time }}</div>
                    <div class="flex items-center">
                        <icon name="el-icon-View" />
                        <div class="ml-[5px]">{{ item.click }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import { getDecorateArticle } from '@/api/decoration'

import type options from './options'

type OptionsType = ReturnType<typeof options>
defineProps({
    content: {
        type: Object as PropType<OptionsType['content']>,
        default: () => ({})
    },
    styles: {
        type: Object as PropType<OptionsType['styles']>,
        default: () => ({})
    }
})
const newsList = ref<any[]>([])
const getData = async () => {
    const data = await getDecorateArticle({
        limit: 10
    })
    newsList.value = data
}
getData()
</script>

<style lang="scss" scoped>
.news {
    .news-title {
        &::before {
            content: '';
            width: 4px;
            height: 17px;
            display: block;
            margin-right: 5px;
            background: #4173ff;
        }
    }
}
</style>

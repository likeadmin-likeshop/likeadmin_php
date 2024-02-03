<template>
    <div class="bg-white rounded-[8px]">
        <div class="flex items-center h-[60px] border-b border-br ml-5 pr-5">
            <div class="flex-1 flex min-w-0 mr-4 h-full">
                <span
                    class="text-2xl truncate font-medium h-full border-b-2 border-tx-primary mt-[1px] flex items-center"
                >
                    {{ header }}
                </span>
            </div>
            <ElButton class="button" link v-if="link">
                <NuxtLink :to="link" class="flex">
                    更多
                    <ElIcon><ArrowRight /></ElIcon>
                </NuxtLink>
            </ElButton>
        </div>
        <slot name="content" :data="data" v-if="data.length">
            <div class="px-5 pb-5">
                <template v-for="(item, index) in data" :key="item.id">
                    <slot name="item" :item="item" :index="index">
                        <InformationItems
                            :index="index"
                            :show-sort="showSort"
                            :id="item.id"
                            :title="item.title"
                            :desc="item.desc"
                            :click="item.click"
                            :author="item.author"
                            :create-time="item.create_time"
                            :image="item.image"
                            :only-title="onlyTitle"
                            :image-size="imageSize"
                            :show-author="showAuthor"
                            :show-desc="showDesc"
                            :show-click="showClick"
                            :border="border"
                            :title-line="titleLine"
                            :show-time="showTime"
                            :source="source"
                        />
                    </slot>
                </template>
            </div>
        </slot>
        <div v-else>
            <el-empty
                :image="empty_news"
                description="暂无资讯"
                :image-size="250"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ElButton, ElIcon, ElEmpty } from 'element-plus'
import empty_news from '@/assets/images/empty_news.png'
import { ArrowRight } from '@element-plus/icons-vue'
import type { PropType } from 'vue'
defineProps({
    header: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    data: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    source: {
        type: String,
        default: 'default'
    },
    onlyTitle: {
        type: Boolean,
        default: true
    },
    titleLine: {
        type: Number,
        default: 1
    },
    border: {
        type: Boolean,
        default: true
    },
    imageSize: {
        type: String,
        default: 'default'
    },
    showAuthor: {
        type: Boolean,
        default: true
    },
    showDesc: {
        type: Boolean,
        default: true
    },
    showClick: {
        type: Boolean,
        default: true
    },
    showTime: {
        type: Boolean,
        default: true
    },
    showSort: {
        type: Boolean,
        default: true
    }
})
</script>
<style lang="scss" scoped></style>

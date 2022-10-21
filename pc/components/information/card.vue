<template>
    <div class="bg-white rounded-[8px]">
        <div class="flex h-[60px] border-b border-br ml-5 pr-5">
            <div class="flex-1 flex min-w-0 mr-4">
                <span
                    class="text-2xl truncate font-medium h-full border-b-2 border-tx-primary mt-[1px] flex items-center"
                >
                    {{ header }}
                </span>
            </div>

            <ElButton class="button" link>
                更多
                <ElIcon><ArrowRight /></ElIcon>
            </ElButton>
        </div>
        <div class="px-5 pb-5" :class="contentClass">
            <template v-for="item in data">
                <slot :item="item">
                    <InformationItems
                        :key="item.id"
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
    </div>
</template>
<script lang="ts" setup>
import { ElButton, ElIcon } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { PropType } from 'vue'
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
    contentClass: {
        type: String
    }
})
</script>
<style lang="scss" scoped></style>

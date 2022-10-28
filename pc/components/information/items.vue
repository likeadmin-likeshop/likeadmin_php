<template>
    <NuxtLink :to="`/information/detail/${id}`">
        <div
            v-if="onlyTitle"
            class="before:w-[6px] mt-4 before:h-[6px] before:bg-primary before:block flex items-center before:rounded-[6px] before:mr-2.5 before:flex-none"
        >
            <slot name="title" :title="title">
                <span class="line-clamp-1 flex-1 font-medium">{{ title }}</span>
            </slot>
            <span class="text-tx-secondary ml-4" v-if="showTime">
                {{ createTime }}
            </span>
        </div>
        <div
            v-else
            :class="{
                'border-b border-br pb-4': border,
                'flex pt-4 items-center': !isHorizontal
            }"
        >
            <div class="flex relative">
                <ElImage
                    v-if="image"
                    class="flex-none"
                    :class="{
                        'mr-4': !isHorizontal
                    }"
                    :src="image"
                    fit="cover"
                    :style="getImageStyle"
                />
            </div>

            <div
                class="flex-1"
                :class="{
                    'p-2': isHorizontal
                }"
            >
                <slot name="title" :title="title">
                    <div
                        class="text-lg font-medium"
                        :class="`line-clamp-${titleLine}`"
                    >
                        {{ title }}
                    </div>
                </slot>

                <div
                    v-if="showDesc && desc"
                    class="text-tx-regular line-clamp-2 mt-4"
                >
                    {{ desc }}
                </div>
                <div
                    v-if="showAuthor || showTime || showClick"
                    class="mt-5 text-tx-secondary flex items-center flex-wrap"
                >
                    <span v-if="showAuthor && author">
                        {{ author }}&nbsp;|&nbsp;
                    </span>
                    <span class="mr-5" v-if="showTime">{{ createTime }}</span>
                    <div v-if="showClick" class="flex items-center">
                        <ElIcon>
                            <View />
                        </ElIcon>
                        <span>&nbsp;{{ click }}人浏览</span>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>
<script lang="ts" setup>
import { ElImage, ElIcon } from 'element-plus'
import { View } from '@element-plus/icons-vue'
const props = defineProps({
    index: {
        type: Number
    },
    id: {
        type: Number
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    image: {
        type: String
    },
    author: {
        type: String
    },
    click: {
        type: Number
    },
    createTime: {
        type: String
    },
    onlyTitle: {
        type: Boolean,
        default: true
    },
    isHorizontal: {
        type: Boolean,
        default: false
    },
    titleLine: {
        type: Number,
        default: 1
    },
    border: {
        type: Boolean,
        default: true
    },
    source: {
        type: String,
        default: 'default'
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

const getImageStyle = computed(() => {
    switch (props.imageSize) {
        case 'default':
            return {
                width: '180px',
                height: '135px'
            }
        case 'mini':
            return {
                width: '120px',
                height: '90px'
            }
        case 'large':
            return {
                width: '260px',
                height: '195px'
            }
    }
})
</script>
<style lang="scss" scoped></style>

<template>
    <el-form label-width="70px">
        <el-card shadow="never" class="!border-none flex mt-2">
            <div class="flex items-end mb-4">
                <div class="text-base dark:text-[#ffffff] text-[#101010] font-medium">展示样式</div>
            </div>
            <el-radio-group v-model="contentData.style">
                <el-radio :value="1">常规</el-radio>
                <el-radio :value="2">大屏</el-radio>
            </el-radio-group>
        </el-card>
        <el-card shadow="never" class="!border-none flex mt-2" v-if="content.style == 1">
            <div class="flex items-end mb-4">
                <div class="text-base text-[#101010] dark:text-[#ffffff] font-medium">背景联动</div>
            </div>
            <el-radio-group v-model="contentData.bg_style">
                <el-radio :value="1">开启</el-radio>
                <el-radio :value="0">关闭</el-radio>
            </el-radio-group>
            <div class="p-[15px] rounded-[8px] bg-[#f3f8ff] text-[#136bdf] mt-2">
                开启背景联动后，需为轮播图设置背景图，轮播图切换时，背景图也跟随切换，此时该页面自身的“页面背景“设置将失效。
            </div>
        </el-card>
        <el-card shadow="never" class="!border-none flex-1 mt-2">
            <div class="flex items-end">
                <div class="text-base text-[#101010] dark:text-[#ffffff] font-medium">轮播图片</div>
                <div v-if="content.style == 1" class="text-xs text-tx-secondary ml-2">
                    最多添加5张，建议图片尺寸：750px*340px
                </div>
                <div v-else class="text-xs text-tx-secondary ml-2">
                    最多添加5张，建议图片尺寸：750px*1100px
                </div>
            </div>
            <div class="flex-1">
                <draggable
                    class="draggable"
                    v-model="contentData.data"
                    animation="300"
                    handle=".drag-move"
                    item-key="index"
                >
                    <template v-slot:item="{ element: item, index }">
                        <del-wrap :key="index" @close="handleDelete(index)" class="w-full">
                            <div class="bg-fill-light w-full p-4 mt-4">
                                <div class="flex justify-center w-[467px]">
                                    <template v-if="content.style == 1">
                                        <material-picker
                                            size="122px"
                                            v-model="item.image"
                                            upload-class="bg-body"
                                            exclude-domain
                                        >
                                            <template #upload>
                                                <div class="w-[122px] h-[122px] banner-upload-btn">
                                                    轮播图
                                                </div>
                                            </template>
                                        </material-picker>
                                        <material-picker
                                            v-if="content.style == 1 || content.bg_style == 1"
                                            class="ml-[40px]"
                                            size="122px"
                                            v-model="item.bg"
                                            upload-class="bg-body"
                                            exclude-domain
                                        >
                                            <template #upload>
                                                <div class="w-[122px] h-[122px] banner-upload-btn">
                                                    背景图
                                                </div>
                                            </template>
                                        </material-picker>
                                    </template>
                                    <template v-else>
                                        <material-picker
                                            width="396px"
                                            height="196px"
                                            v-model="item.image"
                                            upload-class="bg-body"
                                            exclude-domain
                                        />
                                    </template>
                                </div>
                                <div class="flex-1">
                                    <el-form-item class="mt-[18px]" label="图片链接">
                                        <link-picker v-if="type == 'mobile'" v-model="item.link" />
                                        <el-input
                                            v-if="type == 'pc'"
                                            placeholder="请输入链接"
                                            v-model="item.link.path"
                                        />
                                    </el-form-item>
                                    <el-form-item label="是否显示" class="mt-[18px] !mb-0">
                                        <div class="flex-1 flex items-center">
                                            <el-switch
                                                v-model="item.is_show"
                                                active-value="1"
                                                inactive-value="0"
                                            />
                                            <div class="drag-move cursor-move ml-auto">
                                                <icon name="el-icon-Rank" size="18" />
                                            </div>
                                        </div>
                                    </el-form-item>
                                </div>
                            </div>
                        </del-wrap>
                    </template>
                </draggable>
            </div>
            <div class="mt-4" v-if="content.data?.length < limit">
                <el-button class="w-full" type="primary" @click="handleAdd">添加图片</el-button>
            </div>
        </el-card>
    </el-form>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import type { PropType } from 'vue'
import Draggable from 'vuedraggable'

import feedback from '@/utils/feedback'

import type options from './options'

type OptionsType = ReturnType<typeof options>
const emits = defineEmits<(event: 'update:content', data: OptionsType['content']) => void>()
const limit = 5
const props = defineProps({
    content: {
        type: Object as PropType<OptionsType['content']>,
        default: () => ({})
    },
    styles: {
        type: Object as PropType<OptionsType['styles']>,
        default: () => ({})
    },
    type: {
        type: String as PropType<'mobile' | 'pc'>,
        default: 'mobile'
    }
})

const contentData = computed({
    get: () => props.content,
    set: (newValue) => {
        emits('update:content', newValue)
    }
})

const handleAdd = () => {
    if (props.content.data?.length < limit) {
        const content = cloneDeep(props.content)
        content.data.push({
            is_show: '1',
            image: '',
            bg: '',
            name: '',
            link: {}
        })
        emits('update:content', content)
    } else {
        feedback.msgError(`最多添加${limit}张图片`)
    }
}
const handleDelete = (index: number) => {
    if (props.content.data?.length <= 1) {
        return feedback.msgError('最少保留一张图片')
    }
    const content = cloneDeep(props.content)
    content.data.splice(index, 1)
    emits('update:content', content)
}
</script>

<style lang="scss" scoped>
.banner-upload-btn {
    @apply text-tx-secondary box-border rounded border-br border-dashed border flex flex-col justify-center items-center;
}
</style>

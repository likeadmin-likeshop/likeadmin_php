<template>
    <popup ref="popupRef" title="轮播图设置" :async="true" width="980px" @confirm="handleSubmit">
        <el-alert title="最多可添加10张，建议图片尺寸750px*440px" type="warning" />

        <el-scrollbar height="400px" class="mt-4">
            <div class="flex flex-wrap p-4">
                <div v-for="(item, index) in content.data" :key="index" class="w-[400px] mr-4 mb-4">
                    <del-wrap :key="index" @close="handleDelete(index)" class="w-full">
                        <div class="bg-fill-light w-full p-4">
                            <div class="flex items-center">
                                <material-picker
                                    width="122px"
                                    height="122px"
                                    v-model="item.image"
                                    upload-class="bg-body"
                                    exclude-domain
                                >
                                    <template #upload>
                                        <div
                                            class="w-[122px] h-[122px] flex justify-center items-center"
                                        >
                                            轮播图
                                        </div>
                                    </template>
                                </material-picker>
                                <link-picker v-model="item.link" />
                            </div>
                        </div>
                    </del-wrap>
                </div>
            </div>
            <div class="mt-4 ml-4">
                <el-button link type="primary" @click="handleAdd">+ 添加轮播图</el-button>
            </div>
        </el-scrollbar>
    </popup>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import type { PropType } from 'vue'

import Popup from '@/components/popup/index.vue'
import feedback from '@/utils/feedback'

import type options from './options'

type OptionsType = ReturnType<typeof options>
const emits = defineEmits<(event: 'update:content', data: OptionsType['content']) => void>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()

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
        default: '170px'
    }
})

const open = () => {
    popupRef.value?.open()
}

const handleSubmit = () => {
    popupRef.value?.close()
}

const handleAdd = () => {
    if (props.content.data?.length < 10) {
        const content = cloneDeep(props.content)
        content.data.push({
            image: '',
            name: '',
            link: {}
        })
        emits('update:content', content)
    } else {
        feedback.msgError(`最多添加${10}张图片`)
    }
}

const handleDelete = (index: number) => {
    if (props.content.data?.length <= 1) {
        return feedback.msgError('最少保留一个轮播图')
    }
    const content = cloneDeep(props.content)
    content.data.splice(index, 1)
    emits('update:content', content)
}

defineExpose({ open })
</script>

<style lang="scss" scoped></style>

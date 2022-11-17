<template>
    <div>
        <div>
            <draggable class="draggable" v-model="navLists" animation="300">
                <template v-slot:item="{ element: item, index }">
                    <del-wrap class="max-w-[400px]" :key="index" @close="handleDelete(index)">
                        <div class="bg-fill-light flex items-center w-full p-4 mb-4 cursor-move">
                            <material-picker
                                v-model="item.image"
                                upload-class="bg-body"
                                size="60px"
                                exclude-domain
                            >
                                <template #upload>
                                    <div class="upload-btn w-[60px] h-[60px]">
                                        <icon name="el-icon-Plus" :size="20" />
                                    </div>
                                </template>
                            </material-picker>
                            <div class="ml-3 flex-1">
                                <div class="flex">
                                    <span class="text-tx-regular flex-none mr-3">名称</span>
                                    <el-input v-model="item.name" placeholder="请输入名称" />
                                </div>
                                <div class="flex mt-[18px]">
                                    <span class="text-tx-regular flex-none mr-3">链接</span>
                                    <link-picker v-model="item.link" />
                                </div>
                            </div>
                        </div>
                    </del-wrap>
                </template>
            </draggable>
        </div>
        <div>
            <el-button type="primary" @click="handleAdd">添加</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import feedback from '@/utils/feedback'
import type { PropType } from 'vue'
import Draggable from 'vuedraggable'
const props = defineProps({
    modelValue: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    max: {
        type: Number,
        default: 10
    },
    min: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['update:modelValue'])
const navLists = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const handleAdd = () => {
    if (props.modelValue?.length < props.max) {
        navLists.value.push({
            image: '',
            name: '导航名称',
            link: {}
        })
    } else {
        feedback.msgError(`最多添加${props.max}个`)
    }
}
const handleDelete = (index: number) => {
    if (props.modelValue?.length <= props.min) {
        return feedback.msgError(`最少保留${props.min}个`)
    }
    navLists.value.splice(index, 1)
}
</script>

<style lang="scss" scoped></style>

<template>
    <div class="mb-[18px] max-w-[400px]">
        <Draggable
            class="draggable"
            v-model="menu"
            animation="300"
            handle=".drag-move"
            item-key="index"
        >
            <template v-slot:item="{ element, index }">
                <del-wrap @close="handleDelete(index)" class="max-w-[400px]">
                    <div class="bg-fill-light w-full p-4 mt-4">
                        <el-form-item
                            label="导航图标"
                            v-if="
                                element.unselected !== undefined || element.selected !== undefined
                            "
                        >
                            <material-picker
                                v-if="element.unselected !== undefined"
                                v-model="element.unselected"
                                upload-class="bg-body"
                                exclude-domain
                                size="60px"
                            >
                                <template #upload>
                                    <div class="upload-btn w-[60px] h-[60px]">
                                        <icon name="el-icon-Plus" :size="16" />
                                        <span class="text-xs leading-5"> 未选中 </span>
                                    </div>
                                </template>
                            </material-picker>
                            <material-picker
                                v-model="element.selected"
                                v-if="element.selected !== undefined"
                                upload-class="bg-body"
                                exclude-domain
                                size="60px"
                            >
                                <template #upload>
                                    <div class="upload-btn w-[60px] h-[60px]">
                                        <icon name="el-icon-Plus" :size="16" />
                                        <span class="text-xs leading-5"> 选中 </span>
                                    </div>
                                </template>
                            </material-picker>
                        </el-form-item>
                        <el-form-item label="导航名称" v-if="element.name !== undefined">
                            <el-input v-model="element.name" placeholder="请输入名称" />
                        </el-form-item>
                        <el-form-item label="链接地址" v-if="element.link !== undefined">
                            <link-picker v-model="element.link" type="pc" />
                        </el-form-item>
                        <el-form-item label="是否显示" v-if="element.is_show !== undefined">
                            <div class="flex-1 flex items-center">
                                <el-switch
                                    v-model="element.is_show"
                                    active-value="1"
                                    inactive-value="0"
                                />
                                <div class="drag-move cursor-move ml-auto">
                                    <icon name="el-icon-Rank" size="18" />
                                </div>
                            </div>
                        </el-form-item>
                    </div>
                </del-wrap>
            </template>
        </Draggable>
    </div>

    <el-form-item v-if="menu.length < max" label-width="0">
        <el-button type="primary" @click="handleAdd"> 添加导航 </el-button>
    </el-form-item>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import Draggable from 'vuedraggable'

import feedback from '@/utils/feedback'

const props = withDefaults(
    defineProps<{
        modelValue: any[]
        max?: number
        min?: number
        itemData: any
    }>(),
    {
        max: 9999,
        min: -1,
        itemData: () => ({
            name: '',
            selected: '',
            unselected: '',
            is_show: '1',
            link: {}
        })
    }
)
const emit = defineEmits<{
    (event: 'update:modelValue', value: any): void
}>()
const menu = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const handleAdd = () => {
    if (menu.value?.length < props.max) {
        menu.value.push(cloneDeep(props.itemData))
    } else {
        feedback.msgError(`最多添加${props.max}个`)
    }
}
const handleDelete = (index: number) => {
    if (menu.value.length <= props.min && props.min > -1) {
        return feedback.msgError(`最少保留${props.min}个`)
    }
    menu.value.splice(index, 1)
}
</script>

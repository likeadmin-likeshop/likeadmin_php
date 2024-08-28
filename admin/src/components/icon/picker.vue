<template>
    <div class="icon-select">
        <el-popover
            trigger="contextmenu"
            v-model:visible="state.popoverVisible"
            :width="state.popoverWidth"
        >
            <div
                @mouseover.stop="state.mouseoverSelect = true"
                @mouseout.stop="state.mouseoverSelect = false"
            >
                <div>
                    <div class="flex justify-between">
                        <div class="mb-3">请选择图标</div>
                        <div>
                            <span
                                v-for="(item, index) in iconTabsMap"
                                :key="index"
                                class="cursor-pointer text-sm ml-2"
                                :class="{
                                    'text-primary': index == tabIndex
                                }"
                                @click="tabIndex = index"
                            >
                                {{ item.name }}
                            </span>
                        </div>
                    </div>

                    <div class="h-[280px]">
                        <el-scrollbar>
                            <div class="flex flex-wrap">
                                <div v-for="item in iconNamesFliter" :key="item" class="m-1">
                                    <el-button @click="handleSelect(item)">
                                        <icon :name="item" :size="18" />
                                    </el-button>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <template #reference>
                <el-input
                    ref="inputRef"
                    v-model.trim="state.inputValue"
                    placeholder="搜索图标"
                    :autofocus="false"
                    :disabled="disabled"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    clearable
                >
                    <template #prepend>
                        <div class="flex items-center" v-if="modelValue">
                            <el-tooltip class="flex-1 w-20" :content="modelValue" placement="top">
                                <icon
                                    class="mr-1"
                                    :key="modelValue"
                                    :name="modelValue"
                                    :size="16"
                                />
                            </el-tooltip>
                        </div>

                        <template v-else>无</template>
                    </template>
                    <template #append>
                        <el-button>
                            <icon name="el-icon-Close" :size="18" @click="handleClear" />
                        </el-button>
                    </template>
                </el-input>
            </template>
        </el-popover>
    </div>
</template>

<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { ElInput } from 'element-plus'
import { computed, nextTick, onMounted, reactive, shallowRef, watch } from 'vue'

import { getElementPlusIconNames, getLocalIconNames } from './index'

interface Props {
    modelValue: string
    disabled?: boolean
}
withDefaults(defineProps<Props>(), {
    modelValue: '',
    disabled: false
})

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'change', value: string): void
}>()

const tabIndex = ref(0)
const iconTabsMap = [
    {
        name: 'element图标',
        icons: getElementPlusIconNames()
    },
    {
        name: '本地图标',
        icons: getLocalIconNames()
    }
]

const inputRef = shallowRef<InstanceType<typeof ElInput>>()

const state = reactive({
    inputValue: '',
    popoverVisible: false,
    popoverWidth: 0,
    mouseoverSelect: false,
    inputFocus: false
})

// input 框聚焦
const handleFocus = () => {
    state.inputFocus = state.popoverVisible = true
}

// input 框失去焦点
const handleBlur = () => {
    state.inputFocus = false
    state.popoverVisible = state.mouseoverSelect
}

// 选中图标
const handleSelect = (icon: string) => {
    state.mouseoverSelect = state.popoverVisible = false
    emits('update:modelValue', icon)
    emits('change', icon)
}
//取消选中
const handleClear = () => {
    emits('update:modelValue', '')
    emits('change', '')
}

//根据输入框内容塞选
const iconNamesFliter = computed(() => {
    const iconNames = iconTabsMap[tabIndex.value]?.icons ?? []
    if (!state.inputValue) {
        return iconNames
    }
    const inputValue = state.inputValue.toLowerCase()
    return iconNames.filter((icon: string) => {
        if (icon.toLowerCase().indexOf(inputValue) !== -1) {
            return icon
        }
    })
})

// 获取 input 的宽度
const getInputWidth = () => {
    nextTick(() => {
        const inputWidth = inputRef.value?.$el.offsetWidth
        state.popoverWidth = inputWidth < 300 ? 300 : inputWidth
    })
}

//监听body点击事件
useEventListener(document.body, 'click', () => {
    state.popoverVisible = state.inputFocus || state.mouseoverSelect ? true : false
})

watch(
    () => state.popoverVisible,
    async (value) => {
        await nextTick()
        if (value) {
            inputRef.value?.focus()
        } else {
            inputRef.value?.blur()
        }
    }
)

onMounted(() => {
    getInputWidth()
})
</script>

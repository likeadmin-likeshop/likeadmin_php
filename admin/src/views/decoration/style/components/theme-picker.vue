<template>
    <div class="flex flex-wrap">
        <div
            class="py-[18px] px-[20px] flex items-center text-[14px] shadow rounded-lg mr-[20px] mb-[20px] cursor-pointer"
            :class="{ 'is-select': selectId == item.id, unselect: selectId != item.id }"
            v-for="(item, index) in themeColors"
            :key="index"
            @click="handleSelect(item)"
        >
            <div
                class="rounded-full h-[34px] w-[34px]"
                :style="`background: linear-gradient(to right, ${item.color1}, ${item.color2})`"
            ></div>
            <div class="ml-[14px]">{{ item.name }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core'

interface IThemeColors {
    id: number
    name: string
    color1: string
    color2: string
    btnColor: string
}
const props = defineProps<{
    themeColors: IThemeColors[]
    modelValue: number | string
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', id: number | string): void
    (event: 'change', item: IThemeColors): void
}>()
//主题色

const selectId = useVModel(props, 'modelValue', emit)
const handleSelect = (item: IThemeColors) => {
    selectId.value = item.id
    emit('change', item)
}
</script>
<style lang="scss" scoped>
.is-select {
    border: 1px solid #4153ff;
}

.unselect {
    border: 1px solid transparent;
}
</style>

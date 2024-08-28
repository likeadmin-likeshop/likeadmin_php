<template>
    <div class="color-select flex flex-1">
        <el-color-picker v-model="color" :predefine="predefineColors"></el-color-picker>
        <el-input v-model="color" class="mx-[10px] flex-1" type="text" readonly></el-input>
        <el-button type="text" @click="reset">重置</el-button>
    </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    resetColor: {
        type: String,
        default: ''
    }
})

const emit = defineEmits<{
    (event: 'update:modelValue', value: number): void
}>()

const color = useVModel(props, 'modelValue', emit)
const predefineColors = ['#FF2C3C', '#f7971e', '#fa444d', '#e0a356', '#2f80ed', '#2ec840']

const reset = () => {
    color.value = props.resetColor
}
</script>

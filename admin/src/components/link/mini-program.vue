<template>
    <div class="mini-program h-[558px]">
        <div class="text-xl font-medium">
            小程序跳转小程序
        </div>
        <div class="flex flex-wrap items-center mt-8">
            <div class="w-[86px]">
                小程序APPID
            </div>
            <div class="ml-4 flex-1 min-w-[100px]">
                <el-input
                    class="max-w-[320px]"
                    :model-value="modelValue.query?.appId"
                    placeholder="请输入小程序appId"
                    @input="(value) => handleInput('appId', value)"
                />
            </div>
        </div>
        <div class="flex flex-wrap items-center mt-4">
            <div class="w-[86px]">
                小程序路径
            </div>
            <div class="ml-4 flex-1 min-w-[100px]">
                <el-input
                    class="max-w-[320px]"
                    :model-value="modelValue.query?.path"
                    placeholder="请输入小程序路径链接地址"
                    @input="(value) => handleInput('path', value)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { LinkTypeEnum, type Link } from '.'

const props = defineProps({
    modelValue: {
        type: Object as PropType<Link>,
        default: () => ({})
    }
})
const emit = defineEmits<{
    (event: 'update:modelValue', value: Link): void
}>()

const handleInput = (key: 'appId' | 'path', value: string) => {
    emit('update:modelValue', {
        ...props.modelValue,
        name: '小程序跳转',
        query: {
            ...props.modelValue.query,
            [key]: value
        },
        type: LinkTypeEnum.MINI_PROGRAM
    })
}
</script>

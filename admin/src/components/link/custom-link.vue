<template>
    <div class="custom-link h-[530px]">
        <div class="text-xl font-medium">自定义链接</div>
        <div class="flex flex-wrap items-center mt-4">
            <div class="w-[86px] text-right">自定义链接</div>
            <div class="ml-4 flex-1 min-w-[100px]">
                <el-input
                    class="max-w-[320px]"
                    :model-value="modelValue.query?.url"
                    placeholder="请输入链接地址"
                    @input="handleInput"
                />
            </div>
        </div>
        <div class="form-tips ml-[101px] max-w-[320px]">
            请填写完整的带有“https://”或“http://”的链接地址，链接的域名必须在微信公众平台设置业务域名
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import { type Link, LinkTypeEnum } from '.'

defineProps({
    modelValue: {
        type: Object as PropType<Link>,
        default: () => ({})
    }
})
const emit = defineEmits<{
    (event: 'update:modelValue', value: Link): void
}>()

const handleInput = (value: string) => {
    emit('update:modelValue', {
        path: '/pages/webview/webview',
        query: {
            url: value
        },
        type: LinkTypeEnum.CUSTOM_LINK
    })
}
</script>

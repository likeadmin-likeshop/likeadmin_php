<template>
    <div class="custom-link mt-[30px]">
        <div class="flex flex-wrap items-center">
            自定义链接
            <div class="ml-4 flex-1 min-w-[100px]">
                <el-input
                    :model-value="modelValue.query?.url"
                    placeholder="请输入链接地址"
                    @input="handleInput"
                />
            </div>
        </div>
        <div class="form-tips">
            请填写完整的带有“https://”或“http://”的链接地址，链接的域名必须在微信公众平台设置业务域名
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { LinkTypeEnum, type Link } from '.'

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

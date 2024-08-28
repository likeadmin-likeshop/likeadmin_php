<template>
    <view class="bg-white p-[15px] flex text-[#101010] font-medium text-lg"> 联系我们 </view>
    <view
        class="customer-service bg-white flex flex-col justify-center items-center mx-[18px] mt-[15px] rounded-[10px] px-[10px] pb-[50px]"
    >
        <view
            class="w-full border-solid border-0 border-b border-[#f5f5f5] p-[15px] text-center text-[#101010] text-base font-medium"
        >
            {{ content.title }}
        </view>

        <view class="mt-[30px]">
            <decoration-img width="100px" height="100px" :src="content.qrcode" alt="" />
        </view>
        <view v-if="content.remark" class="text-sm mt-[20px] font-medium">{{
            content.remark
        }}</view>
        <view v-if="content.mobile" class="text-sm mt-[12px] flex flex-wrap">
            <a class="ml-[5px] phone text-primary underline" :href="'tel:' + content.mobile">
                {{ content.mobile }}
            </a>
        </view>
        <view v-if="content.time" class="text-muted text-sm mt-[15px]">
            服务时间：{{ content.time }}
        </view>
    </view>
    Î
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

import DecorationImg from '../../decoration-img.vue'
import type options from './options'

type OptionsType = ReturnType<typeof options>
defineProps({
    content: {
        type: Object as PropType<OptionsType['content']>,
        default: () => ({})
    },
    styles: {
        type: Object as PropType<OptionsType['styles']>,
        default: () => ({})
    }
})
</script>

<style lang="scss" scoped>
.customer-service {
    background: #fff;
    @apply flex flex-col justify-center items-center;
}
</style>

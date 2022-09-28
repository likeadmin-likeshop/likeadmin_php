<template>
    <div class="customer-service">
        <decoration-img width="140px" height="140px" :src="content.qrcode" alt="" />
        <div class="text-[15px] mt-[7px] font-medium">{{ content.title }}</div>
        <div class="text-[#666] mt-[20px]">服务时间：{{ content.time }}</div>
        <div class="text-[#666] mt-[7px]">客服电话：{{ content.mobile }}</div>
        <div
            class="text-white text-[16px] rounded-[42px] bg-[#4173FF] w-full h-[42px] flex justify-center items-center mt-[50px]"
        >
            保存二维码图片
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import type options from './options'
import DecorationImg from '../../decoration-img.vue'
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
    margin: 10px 18px;
    border-radius: 10px;
    padding: 50px 55px 80px;
    background: #fff;
    @apply flex flex-col justify-center items-center;
}
</style>

<template>
    <footer class="layout-footer text-center bg-[#222222] py-[30px]">
        <div class="text-[#bebebe]">
            <NuxtLink> 关于我们 </NuxtLink>
            ｜
            <NuxtLink> 用户协议 </NuxtLink>
            ｜
            <NuxtLink> 隐私政策 </NuxtLink>
            ｜
            <NuxtLink> 会员中心 </NuxtLink>
        </div>
        <div class="mt-4 text-tx-secondary">
            <a
                class="mx-1 hover:underline"
                :href="item.value"
                target="_blank"
                v-for="item in appStore.getCopyrightConfig"
                :key="item.key"
            >
                {{ item.key }}
            </a>
        </div>
    </footer>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>

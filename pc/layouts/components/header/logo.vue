<template>
    <NuxtLink v-if="appStore.getWebsiteConfig.pc_logo" class="flex" to="/">
        <img :src="appStore.getWebsiteConfig.pc_logo" class="h-[26px]" />
    </NuxtLink>
</template>
<script lang="ts" setup>
import { useAppStore } from '~~/stores/app'
const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>

<template>
    <div class="bg-white render-html p-[30px] w-[1200px] mx-auto min-h-screen">
        <h1 class="text-center">{{ data.title }}</h1>
        <div class="mx-auto" v-html="data.content"></div>
    </div>
</template>
<script lang="ts" setup>
import { getPolicy } from '~~/api/app'

const route = useRoute()
const { data } = await useAsyncData(
    () =>
        getPolicy({
            type: route.params.type
        }),
    {
        initialCache: false
    }
)

definePageMeta({
    layout: 'blank'
})
</script>
<style lang="scss" scoped></style>

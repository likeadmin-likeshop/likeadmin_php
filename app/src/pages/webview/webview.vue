<template>
    <web-view :src="url" />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const url = ref('')

onLoad((options) => {
    url.value = decodeURIComponent(options.url!)
})
</script>

<style></style>

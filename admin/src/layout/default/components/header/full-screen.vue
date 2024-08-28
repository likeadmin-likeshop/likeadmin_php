<template>
    <div class="full-screen h-full cursor-pointer flex items-center px-2" @click="toggleFullscreen">
        <icon :size="16" :name="`local-icon-${isFullscreen ? 'fullscreen-exit' : 'fullscreen'}`" />
    </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { toggle: toggleFullscreen, isFullscreen } = useFullscreen()
</script>

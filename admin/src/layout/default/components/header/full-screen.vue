<template>
    <div class="full-screen flex">
        <icon
            class="cursor-pointer"
            :size="16"
            name="el-icon-FullScreen"
            @click="toggleFullscreen"
        />
    </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { toggle: toggleFullscreen } = useFullscreen()
</script>

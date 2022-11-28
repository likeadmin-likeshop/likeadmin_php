<script setup lang="ts">
import { useDesignerConfig } from '../../composable'
import Logo from './logo.vue'
const designerConfig = useDesignerConfig()
</script>

<template>
  <div class="header-panel">
    <Logo :config="designerConfig.logo" />
    <div class="header-menu" />
  </div>
</template>

<style lang="scss" scoped>
.header-panel {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>

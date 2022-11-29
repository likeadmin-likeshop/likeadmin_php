<script setup lang="ts">
import { useDesigner } from '../../composable'
import Logo from './logo.vue'
const designer = useDesigner()
</script>

<template>
  <div class="header-panel">
    <Logo :config="designer.config.logo" />
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

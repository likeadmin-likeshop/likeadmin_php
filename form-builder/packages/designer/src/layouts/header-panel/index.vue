<script setup lang="ts">
import { useConfigData } from '../../composable'
import Logo from './logo.vue'
const configData = useConfigData()
</script>

<template>
  <div class="header-panel">
    <Logo :config="configData.logo" />
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

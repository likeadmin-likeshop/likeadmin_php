<script setup lang="ts">
import type { PropType } from 'vue'
import type { Logo } from '../../composable'

const props = defineProps({
  config: {
    type: Object as PropType<Logo>,
    required: true
  }
})
</script>

<template>
  <div v-if="config.show" class="logo-wrap">
    <img class="logo" :src="config.src" alt="logo" />
    <div class="title">{{ config.title }}</div>
  </div>
</template>

<style lang="scss" scoped>
.logo-wrap {
  display: flex;
  align-items: center;
  .logo {
    height: 32px;
  }
  .title {
    font-size: 20px;
    font-weight: 500;
    margin-left: 10px;
  }
}
</style>

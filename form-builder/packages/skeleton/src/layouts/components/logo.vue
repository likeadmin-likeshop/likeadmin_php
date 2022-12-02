<script setup lang="ts">
const props = defineProps({
  src: {
    type: String
  },
  title: {
    type: String
  }
})
</script>

<template>
  <div class="logo-wrap">
    <img class="logo" :src="src" alt="logo" />
    <div class="title">{{ title }}</div>
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

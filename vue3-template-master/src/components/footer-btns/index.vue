<template>
  <div class="footer-btns">
    <div class="footer-btns__content">
      <div class="flex flex-center">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style scoped lang="scss">
.footer-btns {
  height: 60px;
  &__content {
    position: fixed;
    bottom: 0;
    height: 60px;
    right: 0;
    z-index: 99;
  }
}
</style>

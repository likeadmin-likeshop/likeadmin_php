<template>
  <el-image :style="styles" v-bind="props">
    <template #error>
      <div class="flex items-center justify-center h-full w-full text-tx-secondary">
        <icon name="el-icon-Picture" :size="30" />
      </div>
    </template>
  </el-image>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit } from '@/utils/util'
import { imageProps } from 'element-plus'
const props = defineProps({
  width: {
    type: [String, Number],
    default: 'auto'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  },
  ...imageProps
})

const { width, height } = toRefs(props)

const styles = computed<CSSProperties>(() => {
  return {
    width: addUnit(width.value),
    height: addUnit(height.value)
  }
})
</script>

<style lang="scss" scoped>
.el-image {
  font-size: 0;
  @apply bg-page;
  .el-image__error {
    @apply text-xs;
  }
}
</style>

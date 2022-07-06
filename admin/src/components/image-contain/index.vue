<template>
  <el-image :style="styles" v-bind="props">
    <template #default>
      <div class="bg-body flex items-center justify-center h-full w-full">
        <el-icon>
          <icon-picture />
        </el-icon>
      </div>
    </template>
  </el-image>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { Picture as IconPicture, PictureFilled } from '@element-plus/icons-vue'
import { addUnit } from '@/utils/util'
const props = defineProps({
  width: {
    type: [String, Number],
    default: 'auto'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  }
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

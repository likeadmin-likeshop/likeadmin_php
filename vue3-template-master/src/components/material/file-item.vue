<template>
  <div>
    <del-wrap @close="$emit('close')">
      <div class="file-item bg-gray" :style="fileStyle">
        <image-contain
          v-if="type.type == 'image'"
          width="100%"
          height="100%"
          fit="contain"
          :src="uri"
        ></image-contain>
        <video v-else-if="type.type == 'video'" class="video" :src="uri"></video>
        <slot></slot>
      </div>
    </del-wrap>
  </div>
</template>

<script lang="ts">
import { computed, type CSSProperties, defineComponent, inject } from 'vue'
import { addUnit } from '@/utils/util'
export default defineComponent({
  props: {
    // 图片地址
    uri: {
      type: String
    },
    // 图片尺寸
    fileSize: {
      type: [Number, String],
      default: '100px'
    }
  },
  emits: ['close'],
  setup(props) {
    const type = inject<any>('type')
    const fileStyle = computed<CSSProperties>(() => {
      const size = addUnit(props.fileSize)
      return {
        width: size,
        height: size
      }
    })
    return {
      type,
      fileStyle
    }
  }
})
</script>

<style scoped lang="scss">
.file-item {
  border: 1px solid var(--el-border-color);
  box-sizing: border-box;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .video {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}
</style>

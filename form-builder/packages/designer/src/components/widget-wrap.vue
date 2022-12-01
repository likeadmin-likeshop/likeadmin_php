<script setup lang="ts">
import { ElIcon } from 'element-plus'
import { CopyDocument, Delete, Rank } from '@element-plus/icons-vue'
import { useDesigner } from '../composable'
const props = defineProps({
  widget: {
    type: Object,
    default: () => ({})
  }
})
const designer = useDesigner()
</script>

<template>
  <div
    class="widget-wrap"
    :class="{ selected: designer.isSelectWidget(widget) }"
    @click="designer.setSelectWidget(widget)"
  >
    <slot />
    <div class="widget-id">{{ widget.id }}</div>
    <template v-if="designer.isSelectWidget(widget)">
      <div class="widget-action drag-action">
        <el-icon :size="18"><Rank /></el-icon>
      </div>
      <div class="widget-action operate-action">
        <div class="operate-item" @click="designer.copyWidget(widget)">
          <el-icon :size="18"><CopyDocument /></el-icon>
        </div>
        <div class="operate-item">
          <el-icon :size="18"><Delete /></el-icon>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.widget-wrap {
  position: relative;
  border: 1px dashed var(--el-border-color-light);
  background-color: var(--widget-item-bg-color);
  margin: 2px;
  overflow: hidden;
  min-height: 50px;
  min-width: 50px;
  &.selected {
    outline: 1px solid var(--el-color-primary);
    border: 1px solid var(--el-color-primary);
  }
  .widget-action {
    display: flex;
    position: absolute;
    background: var(--el-color-primary);
    z-index: 10;
    opacity: 0.7;
    color: var(--el-color-white);
    &:hover {
      opacity: 1;
    }
  }
  .widget-id {
    position: absolute;
    right: 2px;
    top: 2px;
  }
  .drag-action {
    left: -2px;
    top: -2px;
    padding: 5px;
    cursor: move;
  }
  .operate-action {
    right: -2px;
    bottom: -2px;
    .operate-item {
      display: flex;
      margin: 5px;
      cursor: pointer;
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import Draggable from 'vuedraggable'
import { ElForm, ElFormItem } from 'element-plus'
import { useDesigner } from '../../composable'
import type { PropType } from 'vue'

const designer = useDesigner()
</script>

<template>
  <div class="content-panel">
    <el-form class="widget-form">
      <template v-if="designer.formWidget.length === 0">
        <div class="form-empty">从左侧拖拽或点击来添加字段</div>
      </template>
      <draggable
        class="widget-form-list"
        :list="designer.formWidget"
        item-key="id"
        group="widgetGroup"
        ghost-class="widget-placeholder"
        tag="ul"
        handle=".drag-handler"
      >
        <template #item="{ element: widget, index }">
          <div>{{ widget.title }}</div>
        </template>
      </draggable>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.content-panel {
  height: 100%;
  position: relative;
  background-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow);
  .widget-form {
    height: 100%;
    .form-empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--el-text-color-secondary);
    }
    .widget-form-list {
      min-height: 100%;
      :deep() .widget-placeholder {
        font-size: 0;
        height: 3px;
        box-sizing: border-box;
        background-color: var(--el-color-primary);
        outline-width: 0;
        border: none;
        padding: 0;
        overflow: hidden;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { nextTick, ref, shallowRef } from 'vue'
import Draggable from 'vuedraggable'
import { ElForm, ElScrollbar } from 'element-plus'
import { addUnit } from '@form-builder/shared'
import { useDesigner } from '@form-builder/designer'
import WidgetWrap from '../../components/widget-wrap.vue'
const designer = useDesigner()
const useDragMinHeight = () => {
  const emptyDivRef = shallowRef<HTMLElement>()
  const dragMinHeight = ref(0)
  nextTick(() => {
    dragMinHeight.value = emptyDivRef.value?.getBoundingClientRect().height!
  })
  return {
    emptyDivRef,
    dragMinHeight
  }
}
const { emptyDivRef, dragMinHeight } = useDragMinHeight()

const onDragAdd = (event) => {
  const newIndex = event.newIndex
  const currentWidget = designer.value.formWidgets[newIndex]
  if (currentWidget) {
    designer.value.setSelectWidget(currentWidget)
  }
}
</script>

<template>
  <div class="main-display">
    <el-form class="widget-form">
      <div class="form-wrap h-full">
        <template v-if="designer.componentsTree.length === 0">
          <div ref="emptyDivRef" class="form-empty">
            从左侧拖拽或点击来添加字段
          </div>
        </template>

        <el-scrollbar>
          <draggable
            class="widget-form-list"
            :list="designer.componentsTree"
            item-key="id"
            group="widgetGroup"
            ghost-class="widget-placeholder"
            tag="ul"
            handle=".drag-action"
            :style="{ minHeight: addUnit(dragMinHeight) }"
            @add="onDragAdd"
          >
            <template #item="{ element: widget }">
              <div class="widget-form-item">
                <widget-wrap :widget="widget">
                  <component :is="" :widget="widget" />
                </widget-wrap>
              </div>
            </template>
          </draggable>
        </el-scrollbar>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.main-display {
  height: 100%;
  background-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow);
  display: flex;
  flex-direction: column;
  .widget-form {
    flex: 1;
    min-height: 0;
    position: relative;
    .form-empty {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--el-text-color-secondary);
    }
    .widget-form-list {
      min-height: 100%;
      overflow: hidden;
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

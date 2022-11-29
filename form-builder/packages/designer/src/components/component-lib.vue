<script lang="ts" setup>
import { computed } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import Draggable from 'vuedraggable'
import { uniqueId } from '@form-builder/shared'
import { cloneDeep } from 'lodash'
import { useDesigner } from '../composable'
const designer = useDesigner()
const componentLists = computed(() => designer.value.material.componentLists)
const defaultOpen = computed(() => componentLists.value.map(({ id }) => id))
const handleCloneWidget = (widget) => {
  return designer.value.cloneWidget(widget)
}
</script>

<template>
  <div class="component-lib">
    <el-collapse :model-value="defaultOpen" class="widget-collapse">
      <el-collapse-item
        v-for="category in componentLists"
        :key="category.id"
        :title="category.title"
        :name="category.id"
      >
        <draggable
          tag="ul"
          :list="category.children"
          item-key="key"
          :group="{ name: 'widgetGroup', pull: 'clone', put: false }"
          :sort="false"
          class="widget-lists"
          :clone="handleCloneWidget"
        >
          <template #item="{ element: widget }">
            <li class="widget-item">
              <span>
                {{ widget.title }}
              </span>
            </li>
          </template>
        </draggable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped>
.component-lib {
  .widget-collapse {
    --el-collapse-header-height: 30px;
    .widget-lists {
      padding: 0 10px 10px;
      display: flex;
      flex-wrap: wrap;
      .widget-item {
        font-size: 12px;
        display: block;
        width: 48%;
        line-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 1%;
        color: #333;
        border: 1px solid #f4f6fc;
        background: #f4f6fc;
        cursor: move;
        padding: 0 10px;
        box-sizing: border-box;
        &:hover {
          color: var(--el-color-primary);
          border-color: currentColor;
          border-style: dashed;
        }
      }
    }
    :deep() {
      .el-collapse-item__header {
        padding: 8px 12px;
      }
      .el-collapse-item__content {
        padding: 0;
      }
    }
  }
}
</style>

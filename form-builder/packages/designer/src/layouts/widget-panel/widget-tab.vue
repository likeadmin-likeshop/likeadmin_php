<script lang="ts" setup>
import { computed } from 'vue'
import { widgetsOptions } from '@form-builder/widgets'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import Draggable from 'vuedraggable'
const defaultOpen = computed(() =>
  widgetsOptions.materials.map((item) => item.name)
)
</script>

<template>
  <div class="widget-tab">
    <el-collapse :model-value="defaultOpen" class="widget-collapse">
      <el-collapse-item
        v-for="category in widgetsOptions.materials"
        :key="category.name"
        :title="category.title"
        :name="category.name"
      >
        <draggable
          tag="ul"
          :list="category.widgets"
          item-key="key"
          :group="{ name: 'widgetGroup', pull: 'clone', put: false }"
          ghost-class="widget-placeholder"
          :sort="false"
          class="widget-lists"
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
.widget-tab {
  .widget-collapse {
    --el-collapse-header-height: 30px;
    .widget-lists {
      padding: 0 10px 10px;
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

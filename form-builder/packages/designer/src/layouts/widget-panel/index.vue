<script setup lang="ts">
import { ElScrollbar, ElTabPane, ElTabs } from 'element-plus'
import WidgetTab from './widget-tab.vue'
import TreeTab from './tree-tab.vue'
</script>

<template>
  <div class="widget-panel">
    <el-tabs active-name="component">
      <el-tab-pane label="组件库" name="component">
        <el-scrollbar>
          <widget-tab />
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="大纲树" name="tree">
        <el-scrollbar>
          <tree-tab />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.widget-panel {
  border-right: 1px solid var(--el-border-color);
  height: 100%;
  .el-tabs {
    --el-tabs-header-height: 44px;
    height: 100%;
    :deep() {
      .el-tabs__content {
        height: calc(100% - var(--el-tabs-header-height));
      }
      .el-tabs__header {
        margin-bottom: 0;
        .el-tabs__item {
          padding: 0 12px;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { ElScrollbar, ElTabPane, ElTabs } from 'element-plus'
import type Area from '../skeleton/area'
import type { PropType } from 'vue'
const props = defineProps({
  area: {
    type: Object as PropType<Area>
  }
})
const tabBars = computed(() => {
  return props.area.container.items
})
const defaultActive = computed(() => {
  return tabBars.value.at(0)?.name
})
console.log(tabBars.value)
</script>

<template>
  <div class="widget-panel">
    <el-tabs v-if="tabBars.length" :model-value="defaultActive">
      <el-tab-pane
        v-for="tabBar in tabBars"
        :key="tabBar.name"
        :label="tabBar.title"
        :name="tabBar.name"
      >
        <el-scrollbar>
          <component :is="tabBar.component" />
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
    --el-tabs-header-height: var(--main-header-height);
    height: 100%;
    :deep() {
      .el-tabs__content {
        height: calc(100% - var(--el-tabs-header-height));
      }
      .el-tabs__header {
        margin-bottom: 0;
        .el-tabs__item {
          margin: 0 12px;
          padding: 0;
        }
      }
    }
  }
}
</style>

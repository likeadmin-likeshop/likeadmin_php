<script lang="ts" setup>
import { computed } from 'vue'
import { ElScrollbar, ElTabPane, ElTabs } from 'element-plus'
import type Area from '../skeleton/area'
import type { PropType } from 'vue'
const props = defineProps({
  area: {
    type: Object as PropType<Area>
  }
})
const items = computed(() => {
  return props.area.container.items
})
const defaultActive = computed(() => {
  return items.value.at(0)?.name
})
</script>

<template>
  <div v-show="area.visible" class="left-area">
    <el-tabs :model-value="defaultActive">
      <el-tab-pane
        v-for="item in items"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <el-scrollbar>
          <component :is="item.content" v-bind="item.contentProps" />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.left-area {
  border-right: 1px solid var(--el-border-color);
  height: 100%;
  .el-tabs {
    --el-tabs-header-height: var(--main-top-area-height);
    height: 100%;
    :deep() {
      .el-tabs__content {
        height: calc(100% - var(--main-top-area-height));
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

<template>
  <el-container class="main-container">
    <el-header class="main-header">
      <header-panel />
    </el-header>

    <el-container class="content-container">
      <el-aside width="260px">
        <widget-panel />
      </el-aside>

      <el-main class="center-main">
        <content-panel />
      </el-main>

      <el-aside width="200px">
        <setting-panel />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAside, ElContainer, ElHeader, ElMain } from 'element-plus'
import SettingPanel from './setting-panel/index.vue'
import WidgetPanel from './widget-panel/index.vue'
import HeaderPanel from './header-panel/index.vue'
import ContentPanel from './content-panel/index.vue'
export default defineComponent({
  name: 'FormDesigner',
  components: {
    ElAside,
    ElContainer,
    ElHeader,
    ElMain,
    HeaderPanel,
    SettingPanel,
    WidgetPanel,
    ContentPanel
  },
  setup(props) {}
})
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  font-size: var(--el-font-size-base);
  .main-header {
    --el-header-height: var(--header-height);
  }
  .content-container {
    margin: 8px;
    border: 1px solid var(--el-border-color);
    min-height: 0;
    .center-main {
      background-color: var(--el-bg-color-page);
      height: 100%;
      padding: 0;
    }
  }
}
</style>

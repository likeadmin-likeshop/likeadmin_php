<template>
  <el-container class="main-container">
    <el-header class="main-header">
      <header-panel />
    </el-header>

    <el-container class="content-container">
      <el-aside width="260px">
        <left-area :area="skeleton.leftArea" />
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

<script lang="ts" setup>
import { ElAside, ElContainer, ElHeader, ElMain } from 'element-plus'
import { useDesigner } from '../composable'
import LeftArea from './left-area.vue'
const designer = useDesigner()
const skeleton = designer.value.skeleton
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

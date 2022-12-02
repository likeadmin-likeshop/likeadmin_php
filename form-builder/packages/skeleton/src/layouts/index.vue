<template>
  <el-container class="main-container">
    <el-header class="main-header">
      <TopArea :area="skeleton.topArea" />
    </el-header>

    <el-container class="content-container">
      <el-aside width="260px">
        <LeftArea :area="skeleton.leftArea" />
      </el-aside>

      <el-main class="center-main">
        <MainTopArea :area="skeleton.mainTopArea" />
        <MainArea :area="skeleton.mainArea" />
      </el-main>

      <el-aside width="200px">
        <RightArea :area="skeleton.rightArea" />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ElAside, ElContainer, ElHeader, ElMain } from 'element-plus'
import { useDesigner } from '@form-builder/designer'
import LeftArea from './left-area.vue'
import MainArea from './main-area.vue'
import MainTopArea from './main-top-area.vue'
import TopArea from './top-area.vue'
import RightArea from './right-area.vue'
const designer = useDesigner()
const skeleton = designer.value.skeleton
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.main-container {
  height: 100%;
  font-size: var(--el-font-size-base);
  .main-header {
    --el-header-height: var(--top-area-height);
  }
  .content-container {
    margin: 8px;
    border: 1px solid var(--el-border-color);
    min-height: 0;
    .center-main {
      background-color: var(--el-bg-color-page);
      height: 100%;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>

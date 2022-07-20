<script setup lang="ts">
import { setTheme } from '@/utils/theme'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = () => {
  useToggle(isDark)()
  setTheme('#3A62D7', 'primary', isDark.value)
}
</script>

<template>
  <div class="text-primary shadow">2222</div>
  <el-button @click="toggleDark()">黑夜</el-button>
  <el-button>Default</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
  <el-button>中文</el-button>
</template>

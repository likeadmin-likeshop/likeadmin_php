<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

export default defineComponent({
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      zIndex: 3000,
      size: 'small'
    }
  }
})
</script>

<template>
  <ElConfigProvider>
    <FormBuildView />
  </ElConfigProvider>
</template>

<style lang="scss">
#app {
  height: 100%;
}
</style>

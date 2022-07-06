<template>
  <div class="layout-header bg-white flex col-center p-r-20">
    <div class="flex-1"></div>
    <div class="flex">
      <el-dropdown @command="handleCommand">
        <div class="flex col-center">
          <el-avatar :size="34" :src="userInfo.avatar" />
          <div class="m-l-10 m-r-4">{{ userInfo.name }}</div>
          <el-icon>
            <arrow-down />
          </el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/user/setting">
              <el-dropdown-item>个人设置</el-dropdown-item>
            </router-link>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { useAdmin } from '@/core/hooks/app'
const { store } = useAdmin()
const userInfo = computed(() => store.getters.userInfo)
const router = useRouter()
const handleCommand = (command: string) => {
  switch (command) {
    case 'logout':
      store.dispatch('user/logout').then(() => {
        location.reload()
      })
  }
}
</script>

<style lang="scss">
.layout-header {
  height: 60px;
  flex: none;
}
</style>

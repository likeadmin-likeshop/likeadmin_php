<template>
  <section class="main-wrap h-full bg-page">
    <el-scrollbar>
      <div class="p-4">
        <router-view v-if="isRouteShow" v-slot="{ Component, route }">
          <transition>
            <keep-alive>
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </section>
</template>

<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
const appStore = useAppStore()
const isRouteShow = computed(() => appStore.isRouteShow)
</script>

<style></style>

<template>
  <div class="app-container flex h-screen min-w-[1280px]">
    <div class="app-aside">
      <sidebar />
    </div>

    <div class="flex-1 flex flex-col">
      <div class="app-header">
        <navbar />
      </div>
      <div class="app-main flex-1 min-h-0">
        <app-main />
      </div>
      <setting ref="settingRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppMain from './components/app-main.vue'
import Sidebar from './components/sidebar/index.vue'
import Navbar from './components/navbar.vue'
import Setting from './components/setting.vue'
</script>

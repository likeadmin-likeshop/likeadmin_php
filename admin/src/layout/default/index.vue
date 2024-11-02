<template>
    <div class="layout-default flex h-screen w-full">
        <div class="app-aside">
            <layout-sidebar />
        </div>

        <div class="flex-1 flex flex-col min-w-0">
            <div class="app-header">
                <layout-header />
            </div>
            <div class="app-main flex-1 min-h-0">
                <layout-main />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LayoutHeader from './components/header/index.vue'
import LayoutMain from './components/main.vue'
import LayoutSidebar from './components/sidebar/index.vue'
</script>

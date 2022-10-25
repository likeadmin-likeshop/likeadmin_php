<template>
    <main class="mx-auto w-[1200px] py-4">
        <div
            v-if="sidebar.length"
            class="mr-4 bg-white rounded-[8px] overflow-hidden"
        >
            <Menu
                :menu="sidebar"
                :default-active="activeMenu"
                mode="vertical"
            />
        </div>
        <div
            :class="[
                'layout-page flex-1 min-w-0 rounded-[8px]',
                {
                    'bg-body': hasSidebar
                }
            ]"
        >
            <slot />
        </div>
    </main>
</template>
<script lang="ts" setup>
import Menu from '../menu/index.vue'
const route = useRoute()
const activeMenu = computed<string>(() => route.meta.activeMenu ?? route.path)
const { sidebar, hasSidebar } = useMenu()
</script>

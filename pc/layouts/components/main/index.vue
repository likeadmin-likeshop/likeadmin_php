<template>
    <main
        :class="{
            ' mx-auto w-[1180px] py-4': hasSidebar
        }"
    >
        <div v-if="sidebar.length" class="mr-4 bg-white">
            <Menu
                :menu="sidebar"
                :default-active="activeMenu"
                mode="vertical"
            />
        </div>
        <div
            :class="[
                'layout-page flex-1',
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

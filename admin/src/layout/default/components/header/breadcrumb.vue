<template>
    <el-breadcrumb class="app-breadcrumb">
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
            {{ item.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup lang="ts">
import type { RouteLocationMatched, RouteLocationNormalizedLoaded } from 'vue-router'

import { useWatchRoute } from '@/hooks/useWatchRoute'

const breadcrumbs = ref<RouteLocationMatched[]>([])
const getBreadcrumb = (route: RouteLocationNormalizedLoaded) => {
    const matched = route.matched.filter((item) => item.meta && item.meta.title)
    breadcrumbs.value = matched
}

useWatchRoute((route) => {
    getBreadcrumb(route)
})
</script>

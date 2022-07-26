<template>
    <el-breadcrumb class="app-breadcrumb">
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
            {{ item.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
const route = useRoute()
const breadcrumbs = ref<RouteLocationMatched[]>([])
const getBreadcrumb = () => {
    const matched = route.matched.filter((item) => item.meta && item.meta.title)
    breadcrumbs.value = matched
}
watch(
    () => route.path,
    () => {
        getBreadcrumb()
    }
)

getBreadcrumb()
</script>

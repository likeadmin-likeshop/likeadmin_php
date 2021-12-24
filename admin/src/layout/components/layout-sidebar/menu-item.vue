<template>
    <el-menu-item :index="path">
        <!-- <el-icon><setting /></el-icon> -->
        <span>{{ title }}</span>
    </el-menu-item>
</template>


<script>
export default {
    components: {},
    props: {
        title: String,
        path: String,
        icon: String,
    },
}
</script>


<style lang="scss" scoped>
.sidebar {
    width: 100%;
}
</style>
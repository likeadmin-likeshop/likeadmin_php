<template>
    <el-sub-menu :index="path">
        <template #title>
            <span>{{title}}</span>
        </template>
        <slot></slot>
    </el-sub-menu>
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

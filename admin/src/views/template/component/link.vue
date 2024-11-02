<template>
    <div>
        <el-card header="基础使用" shadow="never" class="!border-none">
            <link-picker v-model="state.value1" />
        </el-card>
    </div>
</template>
<script lang="ts" setup>
const state = reactive({
    value1: {}
})
</script>

<template>
    <div class="layout-main">
        <el-scrollbar>
            <div class="p-15">
                <router-view />
            </div>
        </el-scrollbar>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({})
</script>


<style lang="scss" scoped>
.layout-main {
    height: 100%;
}
</style>
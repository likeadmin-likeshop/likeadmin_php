<template>
    <div class="layout-main">
        <el-scrollbar>
            <div class="p-15">
                <perm />
            </div>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Perm from './perm.vue'
export default defineComponent({
    components: {
        Perm
    }
})
</script>

<style lang="scss" scoped>
.layout-main {
    flex: 1;
    min-height: 0;
}
</style>

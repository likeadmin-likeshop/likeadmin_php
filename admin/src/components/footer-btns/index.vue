<template>
    <div class="footer-wrap">
        <div class="footer-content bg-white flex flex-center">
            <div class="flex flex-center">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style scoped lang="scss">
.footer-wrap {
    height: 60px;
    .footer-content {
        position: fixed;
        bottom: 0;
        left: $layout-aside-width;
        height: 60px;
        right: 0;
        z-index: 99;
    }
}
</style>

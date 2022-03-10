<template>
    <div class="footer-wrap">
        <div class="footer-content">
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
        left: 0;
        padding-left: $layout-aside-width;
        height: 60px;
        right: 0;
        z-index: 99;
    }
}
</style>

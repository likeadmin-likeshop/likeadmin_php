<template>
    <div class="footer-btns">
        <div class="footer-btns__content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style scoped lang="scss">
.footer-btns {
    height: 60px;
    &__content {
        position: fixed;
        bottom: 0;
        height: 60px;
        right: 0;
        left: 0;
        z-index: 99;
        @apply flex justify-center items-center shadow bg-body;
    }
}
</style>

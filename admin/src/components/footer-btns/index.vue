<template>
    <div class="footer-btns">
        <div class="footer-btns__content" :style="fixed ? 'position: fixed' : ''">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    fixed: {
        type: Boolean,
        default: true
    }
})
</script>

<style scoped lang="scss">
.footer-btns {
    height: 60px;
    &__content {
        bottom: 0;
        height: 60px;
        right: 0;
        left: 0;
        z-index: 99;
        @apply flex justify-center items-center shadow bg-body;
    }
}
</style>

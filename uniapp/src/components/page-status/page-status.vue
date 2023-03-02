<template>
    <view
        class="page-status"
        v-if="status !== PageStatusEnum['NORMAL']"
        :class="{ 'page-status--fixed': fixed }"
    >
        <!-- Loading -->
        <template v-if="status === PageStatusEnum['LOADING']">
            <slot name="loading">
                <u-loading :size="60" mode="flower" />
            </slot>
        </template>
        <!-- Error -->
        <template v-if="status === PageStatusEnum['ERROR']">
            <slot name="error"></slot>
        </template>
        <!-- Empty -->
        <template v-if="status === PageStatusEnum['EMPTY']">
            <slot name="empty"></slot>
        </template>
    </view>
    <template v-else>
        <slot> </slot>
    </template>
</template>

<script lang="ts" setup>
import { PageStatusEnum } from '@/enums/appEnums'

const props = defineProps({
    status: {
        type: String,
        default: PageStatusEnum['LOADING']
    },
    fixed: {
        type: Boolean,
        default: true
    }
})
</script>

<style lang="scss" scoped>
.page-status {
    height: 100%;
    width: 100%;
    min-height: 100%;
    padding: 0;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    &--fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 900;
    }
}
</style>

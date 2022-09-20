<template>
    <div class="logo">
        <image-contain :width="szie" :height="szie" :src="config.web_logo" />
        <transition name="title-width">
            <div
                v-show="showTitle"
                class="logo-title overflow-hidden whitespace-nowrap"
                :class="{ 'text-white': theme == ThemeEnum.DARK }"
                :style="{ left: `${szie + 16}px` }"
            >
                <overflow-tooltip
                    :content="title || config.web_name"
                    :teleported="true"
                    placement="bottom"
                    overflo-type="unset"
                >
                </overflow-tooltip>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
import { ThemeEnum } from '@/enums/appEnums'
defineProps({
    szie: { type: Number, default: 34 },
    title: { type: String },
    theme: { type: String },
    showTitle: { type: Boolean, default: true }
})
const appStore = useAppStore()
const config = computed(() => appStore.config)
</script>
<style lang="scss" scoped>
.logo {
    height: var(--navbar-height);
    overflow: hidden;
    @apply flex items-center p-2 relative;
    .logo-title {
        width: 70%;
        position: absolute;
        @apply text-xl;
    }

    .title-width-enter-active {
        opacity: 0;
        transition: all 0.3s ease-out;
    }

    .title-width-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .title-width-enter-from,
    .title-width-leave-to {
        width: 0;
        opacity: 0;
    }
}
</style>

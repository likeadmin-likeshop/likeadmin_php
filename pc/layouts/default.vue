<template>
    <section class="layout-default min-w-[1200px]">
        <LayoutHeader />
        <div class="main-contain">
            <LayoutMain class="flex-1 min-h-0 flex">
                <slot v-if="userStore.isLogin || !$route.meta.auth" />
                <ToLogin class="h-full" v-else />
            </LayoutMain>
            <LayoutFooter />
        </div>
        <Account />
    </section>
</template>
<script lang="ts" setup>
import LayoutHeader from './components/header/index.vue'
import LayoutMain from './components/main/index.vue'
import LayoutFooter from './components/footer/index.vue'
import Account from './components/account/index.vue'
import { useUserStore } from '~~/stores/user'
import ToLogin from './components/account/to-login.vue'
const userStore = useUserStore()
</script>
<style lang="scss" scoped>
.main-contain {
    min-height: calc(100vh - var(--header-height));
    @apply flex flex-col;
}
</style>

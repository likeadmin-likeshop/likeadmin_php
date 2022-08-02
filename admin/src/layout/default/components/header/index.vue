<template>
    <div class="header">
        <div class="navbar">
            <div class="flex-1 flex items-center">
                <fold class="mr-4" />
                <refresh class="mr-4" />
                <breadcrumb class="mr-4" v-if="!isMobile" />
            </div>
            <div class="flex items-center">
                <full-screen class="mr-4" v-if="!isMobile" />
                <user-drop-down class="mr-4" />
                <setting />
            </div>
        </div>
        <multiple-tabs />
    </div>
</template>

<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
import Fold from './fold.vue'
import Refresh from './refresh.vue'
import Breadcrumb from './breadcrumb.vue'
import FullScreen from './full-screen.vue'
import UserDropDown from './user-drop-down.vue'
import Setting from '../setting/index.vue'
import MultipleTabs from './multiple-tabs.vue'

const appStore = useAppStore()
const isMobile = computed(() => appStore.isMobile)
</script>

<style lang="scss">
.navbar {
    height: var(--navbar-height);
    @apply flex items-center pl-4 pr-4 bg-body;
}
</style>

<template>
    <div class="layout">
        <div class="aside">
            <layout-aside />
        </div>
        <div class="main">
            <layout-header />
            <layout-main />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutAside from './components/layout-aside/index.vue'
import LayoutMain from './components/layout-main.vue'
import LayoutHeader from './components/layout-header.vue'
export default defineComponent({
    components: {
        LayoutAside,
        LayoutMain,
        LayoutHeader
    }
})
</script>

<style lang="scss">
.layout {
    display: flex;
    height: 100vh;
    width: 100vw;
    min-width: $layout-min-width;
    .aside {
        flex: none;
        width: $layout-aside-width;
    }
    .main {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
    }
}
</style>

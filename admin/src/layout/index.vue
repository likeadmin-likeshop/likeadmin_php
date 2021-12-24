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


<script>
import LayoutAside from './components/layout-aside'
import LayoutMain from './components/layout-main'
import LayoutHeader from './components/layout-header'
export default {
    components: {
        LayoutAside,
        LayoutMain,
        LayoutHeader
    },
}
</script>


<style lang="scss">

.layout {
    display: flex;
    height: 100vh;
    min-width: $layout-min-width;
    .aside {
        flex: none;
        width: $layout-aside-width;
    }
    .main {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
}
</style>
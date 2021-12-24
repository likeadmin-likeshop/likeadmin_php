<template>
        <div class="layout">
            <div class="aslide">
                <layout-sidebar />
            </div>
            <div class="main">
                <layout-main />
            </div>
        </div>
</template>


<script>
import LayoutSidebar from './components/layout-sidebar'
import LayoutMain from './components/layout-main'
export default {
    components: {
        LayoutSidebar,
        LayoutMain
    },
}
</script>


<style lang="scss">

.layout {
    display: flex;
    height: 100vh;
    min-width: 1200px;
    .aslide {
        flex: none;
        width: 200px;
    }
    .main {
        flex: 1;
    }
}
</style>
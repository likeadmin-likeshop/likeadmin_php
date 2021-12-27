<template>
    <div class="layout-aside">
        <router-link to="/workbench" class="logo flex flex-center">
            <img src="" alt="" />
            Admin管理平台
        </router-link>
        <el-scrollbar style="height: 100%" class="ls-scrollbar">
            
            <el-menu
                active-text-color="#fff"
                background-color="#2a2c41"
                :default-active="currentPath"
                text-color="#E5E5E5"
                router
            >
                <template v-for="(item, index) in sidebar" :key="index">
                    <sub-menu :route="item">
                        <template
                            v-for="(item, index) in item.children"
                            :key="index"
                        >
                            <sub-menu :route="item">
                                <template
                                    v-for="(item, index) in item.children"
                                    :key="index"
                                >
                                    <sub-menu :route="item"></sub-menu>
                                </template>
                            </sub-menu>
                        </template>
                    </sub-menu>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>


<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import SubMenu from './sub-menu'
export default {
    components: {
        SubMenu
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const sidebar = computed(() => store.getters.sidebar)
        const currentPath = computed(() => route.meta?.parent ?? route.path)
        return {
            sidebar,
            currentPath,
        }
    },
}
</script>


<style lang="scss" scoped>
.layout-aside {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #2a2c41;
    .logo {
        height: $layout-header-height;
        font-weight: 500;
        font-size: 18px;
        color: #fff;
    }
    .el-menu {
        box-sizing: border-box;
        min-height: 100vh;
        padding: 10px 0 20px;
        .el-menu-item {
            &.is-active {
                background-color: $color-primary;
            }
        }
    }
}
</style>

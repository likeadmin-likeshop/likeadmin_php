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
                    <sub-menu
                        v-if="hasChildren(item)"
                        :path="item.path"
                        :title="item.meta.title"
                    >
                        <template
                            v-for="(item, index) in item.children"
                            :key="index"
                        >
                            <sub-menu
                                v-if="hasChildren(item)"
                                :path="item.path"
                                :title="item.meta.title"
                            >
                                <template
                                    v-for="(item, index) in item.children"
                                    :key="index"
                                >
                                    <menu-item
                                        :path="item.path"
                                        :title="item.meta.title"
                                    ></menu-item>
                                </template>
                            </sub-menu>
                            <menu-item
                                v-else
                                :path="item.path"
                                :title="item.meta.title"
                            ></menu-item>
                        </template>
                    </sub-menu>
                    <menu-item
                        v-else
                        :path="item.path"
                        :title="item.meta.title"
                    ></menu-item>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>


<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MenuItem from './menu-item'
import SubMenu from './sub-menu'
export default {
    components: {
        MenuItem,
        SubMenu,
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const sidebar = computed(() => store.getters.sidebar)
        const hasChildren = computed(() => (route) => {
            const children = route.children ?? []
            return !!children.filter((item) => !item.hidden).length
        })
        const currentPath = computed(() => route.meta?.parent ?? route.path)
        return {
            sidebar,
            hasChildren,
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

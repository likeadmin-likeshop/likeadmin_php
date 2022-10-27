<template>
    <nav>
        <Menu
            class="navbar"
            :menu="menu"
            :default-active="activeMenu"
            mode="horizontal"
        >
            <template #item="{ item }">
                <MenuItem
                    v-if="!item.component"
                    :menu-item="item"
                    :route-path="item.path"
                />
                <div v-else>
                    <template v-if="item.component == 'information'">
                        <Information :menu-item="item" />
                    </template>
                    <template v-if="item.component == 'mobile'">
                        <Mobile :menu-item="item" />
                    </template>
                    <template v-if="item.component == 'admin'">
                        <Admin :menu-item="item" />
                    </template>
                </div>
            </template>
        </Menu>
    </nav>
</template>
<script lang="ts" setup>
import Menu from '../menu/index.vue'
import MenuItem from '../menu/menu-item.vue'
import Admin from './admin.vue'
import Information from './information.vue'
import Mobile from './mobile.vue'
const route = useRoute()
const activeMenu = computed<string>(() => route.path)
const { menu } = useMenu()
</script>

<style lang="scss" scoped>
.navbar {
    --el-menu-item-font-size: var(--el-font-size-large);
    --el-menu-bg-color: var(--el-color-primary);
    --el-menu-active-color: var(--color-white);
    --el-menu-text-color: var(--color-white);
    --el-menu-item-hover-fill: var(--el-color-primary);
    --el-menu-hover-text-color: var(--color-white);
    --el-menu-hover-bg-color: var(--el-color-primary);
    :deep() {
        & > .el-sub-menu {
            .el-sub-menu__title:hover {
                background-color: var(--el-menu-bg-color);
            }
        }
    }
}
</style>

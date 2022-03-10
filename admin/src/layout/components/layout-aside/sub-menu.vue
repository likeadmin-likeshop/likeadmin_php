<template>
    <template v-if="!route.meta.hidden">
        <el-sub-menu v-if="hasChildren" :index="route.path">
            <template #title>
                <i class="iconfont m-r-10" :class="route.meta.icon"></i>
                <span>{{ route.meta.title }}</span>
            </template>
            <slot></slot>
        </el-sub-menu>
        <el-menu-item v-else :index="route.path">
            <i class="iconfont m-r-10" :class="route.meta.icon"></i>
            <span>{{ route.meta.title }}</span>
        </el-menu-item>
    </template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
export default defineComponent({
    components: {},
    props: {
        route: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        const hasChildren = computed(() => {
            const children: RouteRecordRaw[] = props.route.children ?? []
            return !!children.filter(item => !item.meta?.hidden).length
        })
        return {
            hasChildren
        }
    }
})
</script>

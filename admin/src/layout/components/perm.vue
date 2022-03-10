<template>
    <div v-if="permission" class="perm">
        <template v-if="hasPermission">
            <router-view></router-view>
        </template>
        <template v-else>
            <div class="no-perm flex flex-col flex-center">
                <img src="@/assets/images/no_perm.png" />
                <div class="muted">暂无查看权限</div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAdmin } from '@/core/hooks/app'
export default defineComponent({
    components: {},
    props: {},
    setup(props) {
        const { store, route } = useAdmin()
        const permission = computed(() => store.getters.permission)
        const isAdmin = computed(() => store.getters.isAdmin)
        const hasPermission = computed(() => {
            const { path, meta } = route
            if (isAdmin.value) {
                return true
            }
            const actions = permission.value[path]
            console.log(permission.value, path)
            if (!actions || !meta?.permission) {
                return true
            }
            return actions.some((item: string) => {
                return (meta?.permission as string[]).includes(item)
            })
        })
        return {
            permission,
            hasPermission
        }
    }
})
</script>

<style scoped lang="scss">
.perm {
    .no-perm {
        height: calc(100vh - #{$layout-header-height} - 32px);
        img {
            width: 152px;
            height: 152px;
        }
    }
}
</style>

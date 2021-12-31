<template>
    <keep-alive>
        <router-view v-if="keepAlive && routerAlive" />
    </keep-alive>
    <router-view v-if="!keepAlive && routerAlive" />
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick, provide, onMounted } from 'vue'
import { useAdmin } from './core/hooks/app';
export default defineComponent({
    setup() {
        const { store, route } = useAdmin()
        const routerAlive = ref(true)
        const keepAlive = computed(() => route.meta.keepAlive)
        const reload = () => {
            routerAlive.value = false
            nextTick(() => {
                routerAlive.value = true
            })
        }
		provide('reload', reload)
        onMounted(() => {
            store.dispatch('user/getUser')
            store.dispatch('app/getConfig')
        })
		return {
			routerAlive,
			keepAlive
		}
    }
});
</script>

<style lang="scss">
@import './styles/index.scss';
</style>

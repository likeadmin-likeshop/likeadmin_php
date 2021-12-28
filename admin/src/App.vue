<template>
    <keep-alive>
        <router-view v-if="keepAlive && routerAlive" />
    </keep-alive>
    <router-view v-if="!keepAlive && routerAlive" />
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick, provide } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
    setup() {
        const route = useRoute()
        const routerAlive = ref(true)
        const keepAlive = computed(() => route.meta.keepAlive)
        const reload = () => {
            routerAlive.value = false
            nextTick(() => {
                routerAlive.value = true
            })
        }
		provide('reload', reload)
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

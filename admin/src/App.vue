<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="keepAlive && routerAlive" />
        </keep-alive>
		<router-view v-if="!keepAlive && routerAlive" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            routerAlive: true,
        }
    },
    provide() {
        return {
            reload: this.reload,
        }
    },
    methods: {
        reload() {
            this.routerAlive = false
            this.$nextTick(() => {
                this.routerAlive = true
            })
        },
    },

    computed: {
        keepAlive() {
            return this.$route.meta.keepAlive
        },
    },
    errorCaptured(err, instance, info) {
        console.log(err, instance, info)
    }
}
</script>

<style lang="scss">
@import './styles/index.scss';
</style>

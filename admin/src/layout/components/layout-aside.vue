<template>
	<div class="layout-aside">
		<router-link to="/workbench" class="logo flex col-center">
			<img class="logo-img" :src="config.web_logo" alt />
			<div class="line-1">{{ config.web_name }}</div>
		</router-link>
		<div class="scrollbar-wrap">
			<el-scrollbar style="height: 100%" class="ls-scrollbar">
				<el-menu
					active-text-color="#fff"
					background-color="#2a2c41"
					:default-active="currentPath"
					text-color="#E5E5E5"
					router
				>
					<template v-for="route in sidebar" :key="route.path">
						<menu-item :route="route" :route-path="route.path" />
					</template>
				</el-menu>
			</el-scrollbar>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAdmin } from '@/core/hooks/app'
import MenuItem from './menu-item.vue'
export default defineComponent({
	components: {
		MenuItem
	},
	setup() {
		const { store, route } = useAdmin()
		const sidebar = computed(() => store.getters.sidebar)
		const currentPath = computed(() => route.meta?.activeMenu ?? route.path)
		const config = computed(() => store.getters.config)
		return {
			config,
			sidebar,
			currentPath
		}
	}
})
</script>

<style lang="scss" scoped>
.layout-aside {
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	background-color: #2a2c41;
	.logo {
		height: $layout-header-height;
		font-weight: 500;
		font-size: 18px;
		color: #fff;
		padding: 0 20px;
		.logo-img {
			width: 30px;
			height: 30px;
			margin-right: 10px;
		}
	}
	.scrollbar-wrap {
		flex: 1;
		min-height: 0;
		.el-menu {
			box-sizing: border-box;
			padding: 10px 0 20px;
			:deep(.el-menu-item) {
				&.is-active {
					background-color: $color-primary;
				}
			}
		}
	}
}
</style>

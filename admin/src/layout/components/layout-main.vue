<template>
	<div class="layout-main flex-1">
		<el-scrollbar>
			<div class="p-16 main-content">
				<router-view></router-view>
			</div>
		</el-scrollbar>
	</div>
</template>

<style lang="scss">
.layout-main {
	min-height: 0;
}
</style>

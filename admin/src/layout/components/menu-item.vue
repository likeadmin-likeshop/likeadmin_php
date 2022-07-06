<template>
	<template v-if="!route.meta?.hidden">
		<app-link v-if="!hasShowChild" :to="`${routePath}?${queryStr}`">
			<el-menu-item :index="routePath">
				<menu-title :icon="routeMeta?.icon" :title="routeMeta?.title" />
			</el-menu-item>
		</app-link>
		<el-sub-menu v-else :index="routePath">
			<template #title>
				<menu-title :icon="routeMeta?.icon" :title="routeMeta?.title" />
			</template>
			<menu-item
				v-for="item in route?.children"
				:key="resolvePath(item.path)"
				:route="item"
				:route-path="resolvePath(item.path)"
			/>
		</el-sub-menu>
	</template>
</template>

<script lang="ts" setup>
import type { RouteMeta } from '@/router'
import { getNormalPath, objectToQuery } from '@/utils/util'
import { isExternal } from '@/utils/validate'
import { computed, ref, toRefs } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import MenuTitle from './menu-title'
interface Props {
	route: RouteRecordRaw
	routePath: string
}

const props = defineProps<Props>()

const hasShowChild = computed(() => {
	const children: RouteRecordRaw[] = props.route.children ?? []
	return !!children.filter((item) => !item.meta?.hidden).length
})

const routeMeta = computed<RouteMeta>(() => {
	return props.route.meta as any
})

const resolvePath = (path: string) => {
	if (isExternal(path)) {
		return path
	}
	const newPath = getNormalPath(`${props.routePath}/${path}`)
	return newPath
}
const queryStr = computed<string>(() => {
	const query = props.route.meta?.query as string
	try {
		const queryObj = JSON.parse(query)
		return objectToQuery(queryObj)
	} catch (error) {
		// console.log(error)

		return query
	}
})
</script>

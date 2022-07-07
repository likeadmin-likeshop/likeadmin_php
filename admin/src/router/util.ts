import { RouteRecordName, RouteRecordRaw, RouterView } from 'vue-router'
import Layout from '@/layout/index.vue'
import { EMenuType } from '@/utils/enum'
import { isExternal } from '@/utils/validate'

// 匹配views里面所有的.vue文件，动态引入
const modules = import.meta.glob('/src/views/**/*.vue')

// 过滤路由所需要的数据
export function filterAsyncRoutes(routes: any[], firstRoute = true) {
  return routes.map((route) => {
    const routeRecord = createRouteRecord(route, firstRoute)
    if (route.children != null && route.children && route.children.length) {
      routeRecord.children = filterAsyncRoutes(route.children, false)
    }
    return routeRecord
  })
}

// 创建一条路由记录
export function createRouteRecord(route: any, firstRoute: boolean): RouteRecordRaw {
  //@ts-ignore
  const routeRecord: RouteRecordRaw = {
    path: isExternal(route.paths) ? route.paths : firstRoute ? `/${route.paths}` : route.paths,
    name: Symbol(route.paths),
    meta: {
      hidden: !route.is_show,
      keepAlive: !!route.is_cache,
      title: route.name,
      perms: route.perms,
      query: route.params,
      icon: route.icon,
      type: route.type
    }
  }
  switch (route.type) {
    case EMenuType.CATALOGUE:
      routeRecord.component = firstRoute ? Layout : RouterView
      if (!route.children) {
        routeRecord.component = RouterView
      }
      break
    case EMenuType.MENU:
      routeRecord.component = loadRouteView(route.component)
      break
  }
  return routeRecord
}

// 动态加载组件
export function loadRouteView(component: string) {
  try {
    const key = Object.keys(modules).find((key) => {
      return key.includes(`${component}.vue`)
    })
    if (key) {
      return modules[key]
    }
    throw Error(`找不到组件${component}，请确保组件路径正确`)
  } catch (error) {
    console.error(error)
    return RouterView
  }
}

// 找到第一个有效的路由
export function findFirstValidRoute(routes: RouteRecordRaw[]): RouteRecordName | undefined {
  for (const route of routes) {
    if (route.meta?.type == EMenuType.MENU && !route.meta?.hidden && !isExternal(route.path)) {
      return route.name
    }
    if (route.children) {
      const name = findFirstValidRoute(route.children)
      if (name) {
        return name
      }
    }
  }
}

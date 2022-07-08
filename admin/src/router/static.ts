import { RouteRecordRaw, RouterView } from 'vue-router'
import Layout from '@/layout/index.vue'

/**
 * Note: 路由配置项
 *
 * path: '/path'                    // 路由路径
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
	title: 'title'                  // 设置该路由在侧边栏的名字
	icon: 'icon-name'                // 设置该路由的图标
	activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
	query: '{"id": 1}'             // 访问路由的默认传递参数
	hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 
  }
 */

export const indexRouteName = Symbol()
export const constRoutes: RouteRecordRaw[] = [
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/error/404.vue')
	},
	{
		path: '/403',
		component: () => import('@/views/error/403.vue')
	},
	{
		path: '/login',
		component: () => import('@/views/account/login.vue')
	},
	{
		path: '/user',
		component: Layout,
		children: [
			{
				path: 'setting',
				meta: {
					title: '个人设置'
				},
				component: () => import('@/views/setting/personal/personal_data.vue')
			}
		]

	},
	{
		path: '/permission',
		component: Layout,
		children: [
			{
				path: '/permission/menu/edit',
				component: () => import('@/views/permission/menu/edit.vue'),
				meta: {
					title: '菜单',
					activeMenu: '/permission/menu'
				}
			},
			{
				path: '/permission/admin/edit',
				component: () => import('@/views/permission/admin/edit.vue'),
				meta: {
					title: '管理员',
					activeMenu: '/permission/admin'
				}
			},
			{
				path: '/permission/role/edit',
				component: () => import('@/views/permission/role/edit.vue'),
				meta: {
					title: '管理员',
					activeMenu: '/permission/role'
				}
			}
		]
	},
	{
		path: '/dev_tools',
		component: Layout,
		children: [
			{
				path: '/dev_tools/code/edit',
				component: () => import('@/views/dev_tools/code/edit.vue'),
				meta: { title: '编辑', activeMenu: '/dev_tools/code' },
			}
		],
	},
	{
		path: '/setting',
		component: Layout,
		children: [
			{
				path: '/setting/storage/edit',
				component: () => import('@/views/setting/storage/edit.vue'),
				meta: {
					title: '存储设置',
					activeMenu: '/setting/storage'
				},
			},
			{
				path: '/setting/dict/data',
				component: () => import('@/views/setting/dict/data.vue'),
				meta: {
					title: '数据管理',
					activeMenu: '/setting/dict'
				},
			}
		],
	},
	{
		path: '/organization',
		component: Layout,
		children: [
			{
				path: '/organization/department/edit',
				component: () => import('@/views/organization/department/edit.vue'),
				meta: {
					title: '部门管理',
					activeMenu: '/organization/department',
				}
			},
			{
				path: '/organization/post/edit',
				component: () => import('@/views/organization/post/edit.vue'),
				meta: {
					title: '岗位管理',
					activeMenu: '/organization/post'
				}
			}
		]
	}

]

export const indexRoute: RouteRecordRaw = {
	path: '/',
	component: Layout,
	name: indexRouteName
}
import { Module } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { apiConfigGetAuth } from '@/api/auth'
export interface PermissionModule {
    sidebar: Array<RouteRecordRaw>
    permission: any[] | null
    isAdmin: number
}

const permission: Module<PermissionModule, any> = {
    namespaced: true,
    state: {
        // 左侧菜单
        sidebar: [],
        // 权限列表
        permission: null,
        // 是否是管理员
        isAdmin: 0
    },
    getters: {},
    mutations: {
        setSidebar(state, data) {
            state.sidebar = data
        },
        setPermission(state, data) {
            state.permission = data.auth
            state.isAdmin = data.root
        }
    },
    actions: {
        getPermission({ commit }) {
            return new Promise((resolve, reject) => {
                apiConfigGetAuth()
                    .then(data => {
                        commit('setPermission', data)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
}

export default permission

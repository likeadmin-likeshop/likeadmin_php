import { Module } from 'vuex'
import cache from '@/utils/cache'
import { TOKEN } from '@/config/cachekey'
import { apiLogin, apiLogout, apiUserInfo } from '@/api/user'
import { filterAsyncRoutes } from '@/router/util'
export interface UserModule {
    token: string
    user: Record<string, any>
    sidebar: any[]
    permissions: string[]
}
const user: Module<UserModule, any> = {
    namespaced: true,
    state: {
        token: cache.get(TOKEN) || '',
        user: {},
        // 菜单
        sidebar: [],
        // 权限
        permissions: []
    },
    mutations: {
        setToken(state, data) {
            state.token = data
        },
        setUser(state, data) {
            state.user = data
        },
        setSidebar(state, data) {
            state.sidebar = data
        },
        setPermissions(state, data) {
            state.permissions = data
        }
    },
    actions: {
        //清除用户信息
        clearUserCache({ commit }) {
            commit('setToken', '')
            commit('setUser', {})
            commit('setPermissions', {})
            cache.remove(TOKEN)
        },
        // 登录
        login({ commit }, playload: any) {
            const { account, password } = playload
            return new Promise((resolve, reject) => {
                apiLogin({
                    account: account.trim(),
                    password: password
                })
                    .then((data: any) => {
                        commit('setToken', data.token)
                        cache.set(TOKEN, data.token)
                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        // 退出登录
        logout({ dispatch }) {
            return new Promise((resolve, reject) => {
                apiLogout()
                    .then((data) => {
                        dispatch('clearUserCache')
                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        // 获取管理员信息
        getInfo({ commit }) {
            return new Promise((resolve, reject) => {
                apiUserInfo()
                    .then((data: any) => {
                        commit('setUser', data.user)
                        commit('setSidebar', data.user)
                        commit('setPermissions', data.permissions)
                        commit('setSidebar', filterAsyncRoutes(data.menu))
                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
}

export default user

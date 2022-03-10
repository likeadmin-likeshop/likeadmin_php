import { Module } from 'vuex'
import cache from '@/utils/cache'
import { TOKEN } from '@/config/cachekey'
import { apiLogin, apiLogout, apiUserInfo } from '@/api/user'
export interface UserModule {
    token: string
    user: object
}
const user: Module<UserModule, any> = {
    namespaced: true,
    state: {
        token: cache.get(TOKEN) || '',
        user: {}
    },
    mutations: {
        setToken(state, data) {
            state.token = data
            cache.set(TOKEN, data)
        },
        setUser(state, data) {
            state.user = data
        }
    },
    actions: {
        // 登录
        login({ commit }, data) {
            const { account, password } = data
            return new Promise((resolve, reject) => {
                apiLogin({
                    account: account.trim(),
                    password: password
                })
                    .then((data: any) => {
                        commit('setToken', data.token)
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        // 退出登录
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                apiLogout()
                    .then(data => {
                        commit('setToken', '')
                        commit('setUser', {})
                        cache.remove(TOKEN)
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        // 获取管理员信息
        getUser({ commit }) {
            return new Promise((resolve, reject) => {
                apiUserInfo()
                    .then(data => {
                        commit('setUser', data)
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}

export default user

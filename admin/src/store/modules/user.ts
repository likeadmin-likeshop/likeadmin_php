import { Module } from 'vuex'
import cache from '@/utils/cache'
import { TOKEN } from '@/config/cachekey'
import { login, logout } from '@/api/user'
export interface UserModule {
    token: string,
    user: object
}

const user: Module<UserModule, any> = {
    state: {
        token: '',
        user: {},
    },
    mutations: {
        setToken(state, data) {
            state.token = data
            cache.set(TOKEN, data)
        },
        setUser(state, data) {
            state.user = data
        },
    },
    actions: {
        login({ commit }, data) {
            const { account, password } = data
            return new Promise((resolve, reject) => {
                login({
                    account: account.trim(),
                    password: password,
                })
                    .then((data: any) => {
                        commit('setToken', data.token)
                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                logout()
                    .then(() => {
                        commit('setToken', '')
                        commit('setUser', {})
                        cache.remove(TOKEN)
                        resolve('')
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
    }
}

export default user



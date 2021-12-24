import cache from '@/utils/cache'
import { TOKEN } from '@/config/cachekey'
import { login, logout } from '@/api/user'

const state = {
    token: '',
    user: {},
}

const mutations = {
    setToken(state, data) {
        state.token = data
        cache.set(TOKEN, token)
    },
    setUser(state, data) {
        state.user = data
    },
}

const actions = {
    login({ commit }, data) {
        const { account, password } = data
        return new Promise((resolve, reject) => {
            login({
                account: account.trim(),
                password: password,
            })
                .then((data) => {
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
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}

import { apiConfig } from '@/api/app'
import { Module } from 'vuex'
export interface AppModule {
    config: any
}

const app: Module<AppModule, any> = {
    namespaced: true,
    state: {
        config: {}
    },
    mutations: {
        setConfig(state, data) {
            state.config = data
        }
    },
    actions: {
        getConfig({ commit }) {
            return new Promise((resolve, reject) => {
                apiConfig().then(data => {
                    commit('setConfig', data)
                    resolve(data)
                })
            })
        }
    }
}

export default app

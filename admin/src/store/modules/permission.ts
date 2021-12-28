
import { Module } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
export interface PermissionModule {
    sidebar: Array<RouteRecordRaw>
}

const permission: Module<PermissionModule, any> = {
    namespaced: true,
    state: {
        sidebar: []
    },
    getters: {
       
    },
    mutations: {
        setSidebar(state, data) {
            state.sidebar = data
        }
    },
    actions: {

    }
}

export default permission
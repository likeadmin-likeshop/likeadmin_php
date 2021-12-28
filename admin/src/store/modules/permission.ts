
import { Module } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
export interface PermissionModule {
    sidebar: Array<RouteRecordRaw>
}

const permission: Module<PermissionModule, any> = {
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
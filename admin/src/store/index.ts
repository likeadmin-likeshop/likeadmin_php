import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import getters from './getters'
import modules, { rootState } from './modules'

const store = createStore<rootState>({
    modules: modules,
    getters
})

export const injectionKey: InjectionKey<Store<rootState>> = Symbol('vue-store')

// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore(injectionKey)
}
export default store

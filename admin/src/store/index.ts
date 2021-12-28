import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";
import app, { AppModule } from "./modules/app";
import permission, { PermissionModule } from "./modules/permission";
import user, { UserModule } from "./modules/user";
interface rootState {
    app: AppModule;
    permission: PermissionModule;
    user: UserModule;
}
const store = createStore<rootState>({
    modules: {
        app,
        permission,
        user,
    },
});

export const injectionKey: InjectionKey<Store<rootState>> = Symbol("vue-store");

// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore(injectionKey);
}
export default store;

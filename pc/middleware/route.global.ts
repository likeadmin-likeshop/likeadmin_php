import { useUserStore } from '~~/stores/user'
import { isEmptyObject } from '~~/utils/validate'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()
    try {
        if (userStore.isLogin && isEmptyObject(userStore.userInfo)) {
            await userStore.getUser()
        }
    } catch (error) {
        userStore.$reset()
    }
})

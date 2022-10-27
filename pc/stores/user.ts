import { getUserCenter } from '@/api/user'
import { TOKEN_KEY } from '@/enums/cacheEnums'
import { defineStore } from 'pinia'

interface UserSate {
    userInfo: Record<string, any>
    token: string | null
    temToken: string | null
}
export const useUserStore = defineStore({
    id: 'userStore',
    state: (): UserSate => {
        const TOKEN = useCookie(TOKEN_KEY)
        return {
            userInfo: {},
            token: TOKEN.value || null,
            temToken: null
        }
    },
    getters: {
        isLogin: (state) => !!state.token
    },
    actions: {
        async getUser() {
            const data = await getUserCenter()
            this.userInfo = data
        },
        setUser(userInfo) {
            this.userInfo = userInfo
        },
        login(token: string) {
            const TOKEN = useCookie(TOKEN_KEY)
            this.token = token
            TOKEN.value = token
        },
        logout() {
            const TOKEN = useCookie(TOKEN_KEY)
            this.token = null
            this.userInfo = {}
            TOKEN.value = null
        }
    }
})

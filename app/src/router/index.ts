import { BACK_URL } from '@/enums/cacheEnums'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/auth'
import cache from '@/utils/cache'
import { routes } from './routes'

const whiteList = ['register', 'login', 'forget_pwd']
const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
list.forEach((item) => {
    uni.addInterceptor(item, {
        invoke(e) {
            // 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
            const url = e.url.split('?')[0]
            const currentRoute = routes.find((item) => {
                return url === item.path
            })
            // 需要登录并且没有token
            if (currentRoute?.auth && !getToken()) {
                uni.navigateTo({
                    url: '/pages/login/login'
                })
                return false
            }
            return e
        },
        fail(err) {
            // 失败回调拦截
            console.log(err)
        }
    })
})

export function setupRouter() {
    // #ifdef H5
    const app = getApp()
    app.$router.afterEach((to: any, from: any) => {
        const index = whiteList.findIndex((item) => from.path.includes(item) || from.path === '/')
        const userStore = useUserStore()
        if (index == -1 && !userStore.isLogin) {
            //保存登录前的路径
            cache.set(BACK_URL, from.fullPath)
        }
    })

    // #endif
}

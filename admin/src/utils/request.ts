import router from '@/router'
import useUserStore from '@/stores/modules/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import configs from '@/config'
import { PageEnum } from '@/enums/pageEnum'

const config = {
    baseURL: configs.baseUrl,
    headers: {
        'content-type': 'application/json',
        version: configs.version
    },
    timeout: 10 * 1000 // Timeout
}

const service = axios.create(config)

// 事件集
const eventResponse = {
    // 成功
    success: ({ show, msg, data }: Response<any>) => {
        if (show * 1) {
            ElMessage({ type: 'success', message: msg })
        }
        return data
    },
    // 失败
    error: ({ show, msg }: Response<any>) => {
        if (show * 1) {
            ElMessage({ type: 'error', message: msg })
        }
        return Promise.reject(msg)
    },
    // 重定向
    redirect: () => {
        const userStore = useUserStore()
        userStore.logout().then(() => {
            router.push(PageEnum.LOGIN)
            userStore.resetLoginInfo()
        })
        return Promise.reject()
    },
    // 打开新的页面
    page: ({ data }: Response<any>) => {
        window.location.href = data.url
        return data
    }
}

service.interceptors.request.use(
    (config) => {
        const userStore = useUserStore()
        const token = userStore.token
        if (token) {
            //@ts-ignore
            config.headers.token = token
        }
        return config
    },
    (error) => {
        return error
    }
)
// 响应拦截
service.interceptors.response.use(
    (response) => {
        switch (response.data.code) {
            case 1:
                return eventResponse.success(response.data)
            case 0:
                return eventResponse.error(response.data)
            case -1:
                return eventResponse.redirect()
            case 2:
                return eventResponse.page(response.data)
        }
    },
    (error) => {
        ElMessage({ type: 'error', message: error.message })
        return Promise.reject(error)
    }
)

interface Response<T> {
    code: number
    data: T
    msg: string
    show: number
    message?: string
}
interface Requset {
    get(url: string, params?: unknown): Promise<any>
    post(url: string, params?: unknown): Promise<any>
    upload(url: string, params: unknown): Promise<any>
}

const requset: Requset = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            service
                .get(url, { params: params })
                .then((res) => {
                    NProgress.done()
                    resolve(res)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err)
                })
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            service
                .post(url, params)
                .then((res) => {
                    NProgress.done()
                    resolve(res)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err)
                })
        })
    },
    upload(url, file) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            service
                .post(url, file, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                .then((res) => {
                    NProgress.done()
                    resolve(res)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err)
                })
        })
    }
}
export default requset

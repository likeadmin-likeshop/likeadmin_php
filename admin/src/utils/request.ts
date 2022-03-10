'use strict'

import axios from 'axios'
import { ElMessage } from 'element-plus'
import { version } from '@/config/app'
import store from '@/store'
import { throttle } from './util'
import router from '@/router'
import cache from './cache'
import { TOKEN } from '@/config/cachekey'
// 事件集
const eventResponse = {
    // 成功
    success: ({ show, msg, data }: any): Promise<any> => {
        if (show * 1) {
            ElMessage({ type: 'success', message: msg })
        }
        return data
    },
    // 失败
    error: ({ show, msg }: any): Promise<any> => {
        if (show * 1) {
            ElMessage({ type: 'error', message: msg })
        }
        return Promise.reject(msg)
    },
    // 重定向
    redirect: throttle(() => {
        store.commit('user/setToken', '')
        store.commit('user/setUser', {})
        cache.remove(TOKEN)
        router.push('/login')
        return Promise.reject()
    }),
    // 打开新的页面
    page: ({ data }: any): Promise<any> => {
        window.location.href = data.url
        return data
    }
}

const request = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}/adminapi`,
    timeout: 60 * 1000,
    headers: {
        'Content-Type': 'application/json',
        version
    }
})

request.interceptors.request.use(
    config => {
        const token = store.getters.token
        // header参入Token
        if (config.headers) {
            config.headers.token = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// Add a response interceptor
request.interceptors.response.use(
    response => {
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
    error => {
        console.log(error)
        ElMessage({ type: 'error', message: error })
        return Promise.reject(error)
    }
)

export default request

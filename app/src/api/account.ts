import { client } from '@/utils/client'
import request from '@/utils/request'

// 登录
export function login(data: Record<string, any>) {
    return request.post({ url: '/login/account', data: { ...data, terminal: client } })
}

//注册
export function register(data: Record<string, any>) {
    return request.post({ url: '/login/register', data: { ...data, channel: client } })
}

//向微信请求code的链接
export function getWxCodeUrl() {
    return request.get({ url: '/login/codeUrl', data: { url: location.href } })
}

export function OALogin(data: Record<string, any>) {
    return request.post({ url: '/login/oaLogin', data })
}

export function mnpLogin(data: Record<string, any>) {
    return request.post({ url: '/login/mnpLogin', data })
}

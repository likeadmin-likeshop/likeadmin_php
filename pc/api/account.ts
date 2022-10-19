import { getClient } from '~~/utils/env'

// 登录
export function login(params: any) {
    return $request.post({
        url: '/login/account',
        params: { ...params, terminal: getClient() }
    })
}

//注册
export function register(params: any) {
    return $request.post({
        url: '/login/register',
        params: { ...params, channel: getClient() }
    })
}

//向微信请求code的链接
export function getWxCodeUrl() {
    return $request.get({
        url: '/login/codeUrl',
        params: { url: location.href }
    })
}

export function oALogin(params: any) {
    return $request.post({ url: '/login/oaLogin', params })
}

export function mnpLogin(params: any) {
    return $request.post({ url: '/login/mnpLogin', params })
}

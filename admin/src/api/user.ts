import request from '@/utils/request'
import { terminal } from '@/config/app'

// 登录
export function apiLogin(params: { account: string; password: string }) {
    return request.post('/login/account', { ...params, terminal })
}

// 退出登录
export function apiLogout() {
    return request.post('/login/logout')
}

// 用户信息
export function apiUserInfo() {
    return request.get('/auth.admin/mySelf')
}

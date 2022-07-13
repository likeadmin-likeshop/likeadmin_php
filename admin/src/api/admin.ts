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
export function apiAdminInfo() {
    return request.get('/auth.admin/mySelf')
}

// 编辑管理员信息
export function apiAdminInfoEdit(params: any) {
    return request.post('/auth.admin/editSelf', params)
}

import config from '@/config'
import request from '@/utils/request'

// 登录
export function login(params: Record<string, any>) {
  return request.post('/login/account', { ...params, terminal: config.terminal })
}

// 退出登录
export function logout() {
  return request.post('/login/logout')
}

// 用户信息
export function getUserInfo() {
  return request.get('/auth.admin/mySelf')
}

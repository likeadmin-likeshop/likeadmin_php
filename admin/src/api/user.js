import request from '@/utils/request'

const API = {
    // 登录
    login: '/login',
    // 退出登录
    logout: '/logout'
}

/**
 * login func
 * params: {
 *     account: '',
 *     password: '',
 * }
 * @param params
 * @returns {*}
 */
export function login(params) {
    return request.post(API.login, params)
}

export function logout() {
    return request.post(API.logout)
}

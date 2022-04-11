import request from '@/utils/request'

// 获取备案信息
export function apiGetCopyright() {
    return request.get('/setting.web.web_setting/getCopyright')
}
// 设置备案信息
export function apiSetCopyright(params: any) {
    return request.post('/setting.web.web_setting/setCopyright', { ...params })
}

// 获取网站信息
export function apiGetWebsite() {
    return request.get('/setting.web.web_setting/getWebsite')
}
// 设置网站信息
export function apiSetWebsite(params: any) {
    return request.post('/setting.web.web_setting/setWebsite', { ...params })
}

// 获取政策协议
export function apiGetProtocol() {
    return request.get('/setting.web.web_setting/getAgreement')
}
// 设置政策协议
export function apiSetProtocol(params: any) {
    return request.post('/setting.web.web_setting/setAgreement', params)
}

// 获取系统环境
export function apiSystemInfo() {
    return request.get('/setting.system.system/info')
}

/** S 在线客服 **/
// 获取客服设置
export const apiCustomerServiceGetConfig = (): Promise<any> =>
    request.get('/setting.customer_service/getConfig')

// 设置客服设置
export const apiCustomerServiceSetConfig = (params: any): Promise<any> =>
    request.post('/setting.customer_service/setConfig', params)
/** E 在线客服 **/

/** S 用户设置 **/
// 获取用户设置
export function apiUserConfigGet() {
    return request.get('/setting.user.user/getConfig')
}

// 用户设置
export function apiUserConfigSet(params: any) {
    return request.post('/setting.user.user/setConfig', params)
}

// 获取登录注册设置
export function apiLoginConfigGet() {
    return request.get('/setting.user.user/getRegisterConfig')
}

// 登录注册设置
export function apiLoginConfigSet(params: any) {
    return request.post('/setting.user.user/setRegisterConfig', params)
}
/** E 用户设置 **/



// 获取系统日志列表
export function apiSystemLogLists(params: any) {
    return request.get('/setting.system.log/lists', { params })
}

// 清除系统缓存
export function apiSystemCacheClear() {
    return request.post('/setting.system.cache/clear')
}

// 编辑管理员信息
export function apiAuthAdminEditSelf(params: any) {
    return request.post('/auth.admin/editSelf', params)
}

// 获取管理员信息
export function apiAuthAdminMySelf() {
    return request.post('/auth.admin/mySelf')
}
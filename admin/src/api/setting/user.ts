import request from '@/utils/request'

/**
 * @return { Promise }
 * @description 获取用户设置
 */
export function getUserSetup() {
    return request.get({ url: '/setting.user.user/getConfig' })
}

/**
 * @return { Promise }
 * @param { string } default_avatar 默认用户头像
 * @description 设置用户设置
 */
export function setUserSetup(params: { default_avatar: string }) {
    return request.post({ url: '/setting.user.user/setConfig', params })
}

/**
 * @return { Promise }
 * @description 设置登录注册规则
 */
export function getLogin() {
    return request.get({ url: '/setting.user.user/getRegisterConfig' })
}

export interface LoginSetup {
    login_way: number[] | any // 登录方式, 逗号隔开
    coerce_mobile: number // 强制绑定手机 0/1
    login_agreement: number // 是否开启协议 0/1
    third_auth: number // 第三方登录 0/1
    wechat_auth: number // 微信授权登录 0-关闭 1-开启
    qq_auth: number // qq授权登录 0-关闭 1-开启
}
/**
 * @return { Promise }
 * @param { LoginSetup } LoginSetup
 * @description 设置登录注册规则
 */
export function setLogin(params: LoginSetup) {
    return request.post({ url: '/setting.user.user/setRegisterConfig', params })
}

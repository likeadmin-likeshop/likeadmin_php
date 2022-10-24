export function getUserCenter(headers?: any) {
    return $request.get({ url: '/user/center', headers })
}

// 个人信息
export function getUserInfo() {
    return $request.get({ url: '/user/info' })
}

// 个人编辑
export function userEdit(params: any) {
    return $request.post({ url: '/user/setInfo', params })
}

// 绑定手机
export function userBindMobile(params: any, headers?: any) {
    return $request.post(
        { url: '/user/bindMobile', params, headers },
        { withToken: !headers?.token }
    )
}

// 微信电话
export function userMnpMobile(params: any) {
    return $request.post({ url: '/user/getMobileByMnp', params })
}

// 更改密码
export function userChangePwd(params: any) {
    return $request.post({ url: '/user/changePassword', params })
}

//忘记密码
export function forgotPassword(params: Record<string, any>) {
    return $request.post({ url: '/user/resetPassword', params })
}

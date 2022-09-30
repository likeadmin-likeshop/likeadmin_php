import request from '@/utils/request'

//发送短信
export function smsSend(data: any) {
    return request.post({ url: '/sms/sendCode', data: data })
}

export function getConfig() {
    return request.get({ url: '/index/config' })
}

export function getPolicy(data: any) {
    return request.get({ url: '/index/policy', data: data })
}

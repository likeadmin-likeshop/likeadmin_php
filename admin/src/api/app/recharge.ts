import request from '@/utils/request'

export function getRechargeConfig() {
    return request.get({ url: '/recharge.recharge/getConfig' })
}

// 设置
export function setRechargeConfig(params: any) {
    return request.post({ url: '/recharge.recharge/setConfig', params })
}

import request from '@/utils/request'

// 微信小程序配置保存
export function setWeappConfig(params: any) {
    return request.post({ url: '/channel.mnp_settings/setConfig', params })
}

// 微信小程序配置详情
export function getWeappConfig() {
    return request.get({ url: '/channel.mnp_settings/getConfig' })
}

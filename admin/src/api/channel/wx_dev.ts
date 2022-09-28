import request from '@/utils/request'

// 微信开发平台配置保存
export function setWxDevConfig(params: any) {
    return request.post({ url: '/channel/wx/save', params })
}

// 微信开发平台配置详情
export function getWxDevConfig() {
    return request.get({ url: '/channel/wx/detail' })
}

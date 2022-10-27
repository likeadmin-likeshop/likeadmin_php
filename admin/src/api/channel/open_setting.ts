import request from '@/utils/request'

// 微信开发平台配置保存
export function setOpenSettingConfig(params: any) {
    return request.post({ url: '/channel.open_setting/setConfig', params })
}

// 微信开发平台配置详情
export function getOpenSettingConfig() {
    return request.get({ url: '/channel.open_setting/getConfig' })
}

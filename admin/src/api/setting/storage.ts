import request from '@/utils/request'

// 获取存储引擎列表
export function storageLists() {
    return request.get({ url: '/setting.storage/lists' })
}

// 设置存储引擎信息
export function storageChange(params: any) {
    return request.post({ url: '/setting.storage/change', params })
}

// 设置存储引擎信息
export function storageSetup(params: any) {
    return request.post({ url: '/setting.storage/setup', params })
}

// 获取存储配置信息
export function storageDetail(params: any) {
    return request.get({ url: '/setting.storage/detail', params })
}

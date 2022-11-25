import request from '@/utils/request'

// 获取系统环境
export function systemInfo() {
    return request.get({ url: '/setting.system.system/info' })
}

// 获取系统日志列表
export function systemLogLists(params: any) {
    return request.get({ url: '/setting.system.log/lists', params }, { ignoreCancelToken: true })
}

// 清除系统缓存
export function systemCacheClear() {
    return request.post({ url: '/setting.system.cache/clear' })
}

import request from '@/utils/request'

// 获取系统环境
export function systemInfo() {
    return request.get('/setting.system.system/info')
}

// 获取系统日志列表
export function systemLogLists(params: any) {
    return request.get('/setting.system.log/lists', params)
}

// 清除系统缓存
export function systemCacheClear() {
    return request.post('/setting.system.cache/clear')
}

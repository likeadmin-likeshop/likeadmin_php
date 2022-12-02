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

// 定时任务列表
export function crontabLists(params: any) {
    return request.get({ url: '/crontab.crontab/lists', params })
}

// 添加定时任务
export function crontabAdd(params: any) {
    return request.post({ url: '/crontab.crontab/add', params })
}

// 定时任务详情
export function crontabDetail(params: any) {
    return request.get({ url: '/crontab.crontab/detail', params })
}

// 编辑定时任务
export function crontabEdit(params: any) {
    return request.post({ url: '/crontab.crontab/edit', params })
}

// 删除定时任务
export function crontabDel(params: any) {
    return request.post({ url: '/crontab.crontab/delete', params })
}

// 获取规则执行时间
export function crontabExpression(params: any) {
    return request.get({ url: '/crontab.crontab/expression', params })
}

// 操作定时任务
export function srontabOperate(params: any) {
    return request.post({ url: '/crontab.crontab/operate', params })
}

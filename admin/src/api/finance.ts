import request from '@/utils/request'

// 余额明细
export function accountLog(params?: any) {
    return request.get({ url: '/finance.account_log/lists', params })
}

// 充值记录
export function rechargeLists(params?: any) {
    return request.get({ url: '/recharge.recharge/lists', params })
}

// 余额变动类型
export function getUmChangeType(params?: any) {
    return request.get({ url: '/finance.account_log/getUmChangeType', params })
}

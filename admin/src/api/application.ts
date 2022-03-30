import request from '@/utils/request'

// 短信通知列表
export function apiNoticeLists(params: any) {
    return request.get('/notice.notice/settingLists', { params })
}

// 短信通知详情
export function apiNoticeDetail(params: any) {
    return request.get('/notice.notice/detail', { params })
}

// 设置短信通知
export function apiNoticeEdit(params: any) {
    return request.post('/notice.notice/set', params)
}

// 短信设置列表
export function apiSmsLists() {
    return request.get('/notice.sms_config/getConfig')
}

// 短信设置详情
export function apiSmsDetail(params: any) {
    return request.get('/notice.sms_config/detail', { params })
}

// 设置短信通知
export function apiSmsEdit(params: any) {
    return request.post('/notice.sms_config/setConfig', params)
}

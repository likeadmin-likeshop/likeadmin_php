import request from '@/utils/request'

// 工作台主页
export function apiWorkbench() {
    return request.get('/Workbench/index')
}

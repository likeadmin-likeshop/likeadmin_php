import request from '@/utils/request'

// 管理员列表
export function adminLists(params: any) {
    return request.get('/auth.admin/lists', params)
}

// 管理员添加
export function adminAdd(params: any) {
    return request.post('/auth.admin/add', params)
}

// 管理员编辑
export function adminEdit(params: any) {
    return request.post('/auth.admin/edit', params)
}

// 管理员删除
export function adminDelete(params: any) {
    return request.post('/auth.admin/delete', params)
}

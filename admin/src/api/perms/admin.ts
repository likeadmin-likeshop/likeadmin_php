import request from '@/utils/request'

// 管理员列表
export function adminLists(params: any) {
    return request.get({ url: '/auth.admin/lists', params }, { ignoreCancelToken: true })
}
// 管理员列表全部
export function adminAll(params: any) {
    return request.get({ url: '/auth.admin/all', params })
}
// 管理员添加
export function adminAdd(params: any) {
    return request.post({ url: '/auth.admin/add', params })
}

// 管理员编辑
export function adminEdit(params: any) {
    return request.post({ url: '/auth.admin/edit', params })
}

// 管理员删除
export function adminDelete(params: any) {
    return request.post({ url: '/auth.admin/delete', params })
}

// 管理员详情
export function adminDetail(params: any) {
    return request.get({ url: '/auth.admin/detail', params })
}

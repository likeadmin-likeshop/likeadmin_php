import request from '@/utils/request'

// 岗位列表
export function jobsLists(params: any) {
    return request.get({ url: '/dept.jobs/lists', params }, { ignoreCancelToken: true })
}

// 岗位列表全部
export function jobsAll(params: any) {
    return request.get({ url: '/dept.jobs/all', params })
}

// 添加岗位
export function jobsAdd(params: any) {
    return request.post({ url: '/dept.jobs/add', params })
}

// 编辑岗位
export function jobsEdit(params: any) {
    return request.post({ url: '/dept.jobs/edit', params })
}

// 删除岗位
export function jobsDelete(params: any) {
    return request.post({ url: '/dept.jobs/delete', params })
}

// 岗位详情
export function jobsDetail(params: any) {
    return request.get({ url: '/dept.jobs/detail', params })
}

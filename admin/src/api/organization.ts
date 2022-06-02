import request from '@/utils/request'

// 部门
// 部门列表
export function apiDeptLists(params: any) {
    return request.get('dept.dept/lists', { params })
}

// 添加部门
export function apiDeptAdd(params: any) {
    return request.post('/dept.dept/add', params)
}

// 编辑部门
export function apiDeptEdit(params: any) {
    return request.post('/dept.dept/edit', params)
}

// 删除部门
export function apiDeptDelete(params: any) {
    return request.post('/dept.dept/delete', params)
}

// 部门详情
export function apiDeptDetail(params: any) {
    return request.get('/dept.dept/detail', { params })
}

// 上级部门列表
export function apiLeaderDept() {
    return request.get('dept.dept/leaderDept')
}

// 岗位
// 岗位列表
export function apiJobsLists(params: any) {
    return request.get('dept.jobs/lists', { params })
}

// 添加岗位
export function apiJobsAdd(params: any) {
    return request.post('/dept.jobs/add', params)
}

// 编辑岗位
export function apiJobsEdit(params: any) {
    return request.post('/dept.jobs/edit', params)
}

// 删除岗位
export function apiJobsDelete(params: any) {
    return request.post('/dept.jobs/delete', params)
}

// 岗位详情
export function apiJobsDetail(params: any) {
    return request.get('/dept.jobs/detail', { params })
}


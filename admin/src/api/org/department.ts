import request from '@/utils/request'

// 部门列表
export function deptLists(params?: any) {
    return request.get('dept.dept/lists', params)
}

// 添加部门
export function deptAdd(params: any) {
    return request.post('/dept.dept/add', params)
}

// 编辑部门
export function deptEdit(params: any) {
    return request.post('/dept.dept/edit', params)
}

// 删除部门
export function deptDelete(params: any) {
    return request.post('/dept.dept/delete', params)
}

// 上级部门列表
export function leaderDept() {
    return request.get('dept.dept/leaderDept')
}

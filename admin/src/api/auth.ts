import request from '@/utils/request'
import { terminal } from '@/config/app'

export function adminLists(params: any) {
    return request.get('/auth.admin/lists', { params })
}

// 管理员添加
export function apiAdminAdd(params: any) {
    return request.post('/auth.admin/add', params)
}

export function apiAdminEdit(params: any) {
    return request.post('/auth.admin/edit', params)
}

// 管理员删除
export function apiAdminDelete(params: { id: number }) {
    return request.post('/auth.admin/delete', params)
}

// 管理员详情
export function apiAdminDetail(params: any) {
    return request.get('/auth.admin/detail', { params })
}
// 角色列表
export function apiRoleLists(params: any) {
    return request.get('/auth.role/lists', { params })
}
// 添加角色
export function apiRoleAdd(params: any) {
    return request.post('/auth.role/add', { ...params })
}
// 编辑角色
export function apiRoleEdit(params: any) {
    return request.post('/auth.role/edit', { ...params })
}
// 删除角色
export function apiRoleDel(params: any) {
    return request.post('/auth.role/delete', { ...params })
}
// 角色详情
export function apiRoleDetail(params: any) {
    return request.get('/auth.role/detail', { params })
}

// 角色权限菜单
export function apiConfigGetMenu() {
    return request.get('/config/getMenu')
}

// 角色权限
export function apiConfigGetAuth() {
    return request.get('/config/getAuth')
}

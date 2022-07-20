import request from '@/utils/request'

// 菜单列表
export function getMenuLists(params: Record<string, any>) {
  return request.get('/auth.menu/lists', { params })
}

// 添加菜单
export function menuAdd(params: Record<string, any>) {
  return request.post('/auth.menu/add', params)
}

// 编辑菜单
export function menuEdit(params: Record<string, any>) {
  return request.post('/auth.menu/edit', params)
}

// 菜单删除
export function menuDelete(params: Record<string, any>) {
  return request.post('/auth.menu/delete', params)
}

export function getAdminLists(params: any) {
  return request.get('/auth.admin/lists', { params })
}

// 管理员添加
export function adminAdd(params: any) {
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
export function apiRoleDelete(params: any) {
  return request.post('/auth.role/delete', { ...params })
}
// 角色详情
export function apiRoleDetail(params: any) {
  return request.get('/auth.role/detail', { params })
}

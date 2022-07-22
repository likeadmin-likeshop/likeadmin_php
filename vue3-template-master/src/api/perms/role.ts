import request from '@/utils/request'

// 角色列表
export function roleLists(params: any) {
  return request.get('/auth.role/lists', params)
}
// 添加角色
export function roleAdd(params: any) {
  return request.post('/auth.role/add', params)
}
// 编辑角色
export function roleEdit(params: any) {
  return request.post('/auth.role/edit', params)
}
// 删除角色
export function roleDelete(params: any) {
  return request.post('/auth.role/delete', params)
}

// 角色详情
export function roleDetail(params: any) {
  return request.get('/auth.role/detail', params)
}
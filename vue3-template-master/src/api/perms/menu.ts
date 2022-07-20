import request from '@/utils/request'

// 菜单列表
export function menuLists(params: Record<string, any>) {
  return request.get('/auth.menu/lists', params)
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

import request from '@/utils/request'

export function fileCateAdd(params: Record<string, any>) {
  return request.post('/file/addCate', params)
}

export function fileCateEdit(params: Record<string, any>) {
  return request.post('/file/editCate', params)
}

// 文件分类删除
export function fileCateDelete(params: Record<string, any>) {
  return request.post('/file/delCate', params)
}

// 文件分类列表
export function fileCateLists(params: Record<string, any>) {
  return request.get('/file/listCate', params)
}

// 文件列表
export function fileList(params: Record<string, any>) {
  return request.get('/file/lists', params)
}

// 文件删除
export function fileDelete(params: Record<string, any>) {
  return request.post('/file/delete', params)
}

// 文件移动
export function fileMove(params: Record<string, any>) {
  return request.post('/file/move', params)
}

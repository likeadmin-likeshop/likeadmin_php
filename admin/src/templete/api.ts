import request from "@/utils/request"

// 字典类型列表
export function apiDictTypeLists(params: any) {
    return request.get('/setting.dict.dict_type/lists', { params })
}

// 添加字典类型
export function apiDictTypeAdd(params: any) {
    return request.post('/setting.dict.dict_type/add', params)
}

// 编辑字典类型
export function apiDictTypeEdit(params: any) {
    return request.post('/setting.dict.dict_type/edit', params)
}

// 删除字典类型
export function apiDictTypeDelete(params: any) {
    return request.post('/setting.dict.dict_type/delete', params)
}

// 字典类型详情
export function apiDictTypeDetail(params: any) {
    return request.get('/setting.dict.dict_type/detail', { params })
}
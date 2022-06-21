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

// 字典数据列表
export function apiDictDataLists(params: any) {
    return request.get('/setting.dict.dict_data/lists', { params })
}

// 添加字典数据
export function apiDictDataAdd(params: any) {
    return request.post('/setting.dict.dict_data/add', params)
}

// 编辑字典数据
export function apiDictDataEdit(params: any) {
    return request.post('/setting.dict.dict_data/edit', params)
}

// 删除字典数据
export function apiDictDataDelete(params: any) {
    return request.post('/setting.dict.dict_data/delete', params)
}

// 字典数据详情
export function apiDictDataDetail(params: any) {
    return request.get('/setting.dict.dict_data/detail', { params })
}
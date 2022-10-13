import request from '@/utils/request'

// 字典类型列表
export function dictTypeLists(params: any) {
    return request.get({ url: '/setting.dict.dict_type/lists', params })
}

// 字典类型列表全部
export function dictTypeAll(params: any) {
    return request.get({ url: '/setting.dict.dict_type/all', params })
}

// 添加字典类型
export function dictTypeAdd(params: any) {
    return request.post({ url: '/setting.dict.dict_type/add', params })
}

// 编辑字典类型
export function dictTypeEdit(params: any) {
    return request.post({ url: '/setting.dict.dict_type/edit', params })
}

// 删除字典类型
export function dictTypeDelete(params: any) {
    return request.post({ url: '/setting.dict.dict_type/delete', params })
}

// 字典类型详情
export function dictTypeDetail(params: any) {
    return request.get({ url: '/setting.dict.dict_type/detail', params })
}

// 字典数据列表
export function dictDataLists(params: any) {
    return request.get(
        { url: '/setting.dict.dict_data/lists', params },
        {
            ignoreCancelToken: true
        }
    )
}

// 添加字典数据
export function dictDataAdd(params: any) {
    return request.post({ url: '/setting.dict.dict_data/add', params })
}

// 编辑字典数据
export function dictDataEdit(params: any) {
    return request.post({ url: '/setting.dict.dict_data/edit', params })
}

// 删除字典数据
export function dictDataDelete(params: any) {
    return request.post({ url: '/setting.dict.dict_data/delete', params })
}

// 字典数据详情
export function dictDataDetail(params: any) {
    return request.get({ url: '/setting.dict.dict_data/detail', params })
}

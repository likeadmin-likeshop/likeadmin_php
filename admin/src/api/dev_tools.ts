import request from "@/utils/request";

// 代码生成已选数据表列表接口
export function apiGenerateTable(params: any) {
    return request.get('/tools.generator/generateTable', { params })
}


// 数据表列表接口
export function apiDataTable(params: any) {
    return request.get('/tools.generator/dataTable', { params })
}

//选择要生成代码的数据表 
export function apiSelectTable(params: any) {
    return request.post('/tools.generator/selectTable', params)
}

// 已选择的数据表详情
export function apiTableDetail(params: any) {
    return request.get('/tools.generator/detail', {params})
}

//同步字段
export function apiSyncColumn(params: any) {
    return request.post('/tools.generator/syncColumn', params)
}

//删除已选择的数据表
export function apiGenerateDel(params: any) {
    return request.post('/tools.generator/delete', params)
}

//编辑已选表字段
export function apiGenerateEdit(params: any) {
    return request.post('/tools.generator/edit', params)
}


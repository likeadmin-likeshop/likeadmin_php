import request from '@/utils/request'

// 代码生成已选数据表列表接口
export function generateTable(params: any) {
    return request.get({ url: '/tools.generator/generateTable', params })
}

// 数据表列表接口
export function dataTable(params: any) {
    return request.get({ url: '/tools.generator/dataTable', params })
}

//选择要生成代码的数据表
export function selectTable(params: any) {
    return request.post({ url: '/tools.generator/selectTable', params })
}

// 已选择的数据表详情
export function tableDetail(params: any) {
    return request.get({ url: '/tools.generator/detail', params })
}

//同步字段
export function syncColumn(params: any) {
    return request.post({ url: '/tools.generator/syncColumn', params })
}

//删除已选择的数据表
export function generateDelete(params: any) {
    return request.post({ url: '/tools.generator/delete', params })
}

//编辑已选表字段
export function generateEdit(params: any) {
    return request.post({ url: '/tools.generator/edit', params })
}

//预览代码
export function generatePreview(params: any) {
    return request.post({ url: '/tools.generator/preview', params })
}

//生成代码
export function generateCode(params: any) {
    return request.post({ url: '/tools.generator/generate', params })
}

//获取模型
export function getModels() {
    return request.get({ url: '/tools.generator/getModels' })
}

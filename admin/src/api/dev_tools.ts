import request from "@/utils/request";

// 代码生成已选数据表列表接口
export function apiGenerateTable(params: any) {
    return request.get('/tools.generator/generateTable', { params })
}


// 数据表列表接口
export function apiDataTable(params: any) {
    return request.get('/tools.generator/dataTable', { params })
}
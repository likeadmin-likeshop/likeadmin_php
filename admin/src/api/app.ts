import request from "@/utils/request";

// 文件分类添加
interface FileCateAdd {
    type: 10 | 20 | 30;
    pid: number;
    name: string;
}
export function fileCateAdd(params: FileCateAdd) {
    return request.post("/file/addCate", params);
}

export function fileCateEdit(params: { id: number; name: string }) {
    return request.post("/file/editCate", params);
}

// 文件分类删除
export function fileCateDelete(params: { id: number }) {
    return request.post("/file/delCate", params);
}

// 文件分类列表
export function fileCateLists(params: any) {
    return request.get("/file/listCate", {params});
}

// 文件列表
export function fileList(params: any) {
    return request.get("/file/lists", {params});
}

// 文件删除
export function fileDelete(params: { ids: any[] }) {
    return request.post("/file/delete", params);
}

// 文件移动
export function fileMove(params: { ids: any[]; cid: number }) {
    return request.post("/file/move", params);
}

// 文件重命名
export function fileRename(params: { id: number; name: string }) {
    return request.post("/file/rename", params);
}

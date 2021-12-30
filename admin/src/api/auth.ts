import request from "@/utils/request";
import { terminal } from "@/config/app";

// 管理员列表
interface AdminLists {
    name: string;
    account: string;
    role_id: string;
}
export function adminLists(params: AdminLists) {
    return request.get("/auth.admin/lists", { params });
}

// 管理员编辑
interface AdminEdit {
    id: number;
    account: string;
    name: string;
    role_id: number;
    disable: number;
    multipoint_login: number;
}

export function adminEdit(params: AdminEdit) {
    return request.post("/auth.admin/edit", params);
}

// 管理员删除
export function adminDelete(params: { id: number }) {
    return request.post("/auth.admin/delete", params);
}



// 角色列表
export function apiRoleLists(){
    return request.get("/auth.role/lists");
}
// 添加角色
export function apiRoleAdd(params: any) {
    return request.post("/auth.role/add", { ...params });
}
// 编辑角色
export function apiRoleEdit(params: any){
    return request.post("/auth.role/edit", { ...params });
}
// 删除角色
export function apiRoleDel(params: any) {
    return request.post("/auth.role/del", { ...params });
}
// 角色详情
export function apiRoleDetail(params: any){
    return request.get("/auth.role/detail", { params });
}

// 角色权限菜单
export function apiConfigGetMenu(){
    return request.get("/config/getMenu");
}

// 角色权限
export function apiConfigGetAuth(){
    return request.get("/config/getAuth");
}

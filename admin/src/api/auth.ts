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

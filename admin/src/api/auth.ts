

import request from "@/utils/request";
import { terminal } from '@/config/app'
const API = {
    // 管理员列表
    adminLists: "/auth.admin/lists",
    adminEdit: "/auth.admin/edit"
};

interface adminLists {
    name: string;
    account: string;
    role_id: string;
}
export function adminLists(params: adminLists){
    return request.get(API.adminLists, {params});
}

export function adminEdit(params: any){
    return request.post(API.adminEdit, params);
}

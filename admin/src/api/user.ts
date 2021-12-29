import request from "@/utils/request";
import { terminal } from '@/config/app'


// 登录
interface Login {
    account: string;
    password: string;
}
export function login(params: Login){
    return request.post("/login/account", {...params, terminal});
}

// 退出登录
export function logout() {
    return request.post("/login/logout");
}

import request from "@/utils/request";
import { terminal } from "@/config/app";

// 登录
export function login(params: { account: string; password: string }) {
    return request.post("/login/account", { ...params, terminal });
}

// 退出登录
export function logout() {
    return request.post("/login/logout");
}

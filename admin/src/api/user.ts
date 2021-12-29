import request from "@/utils/request";
import { terminal } from '@/config/app'
const API = {
    // 登录
    login: "/login/account",
    // 退出登录
    logout: "/login/logout",
};

interface login {
    account: string;
    password: string;
}
export function login(params: login){
    return request.post(API.login, {...params, terminal});
}

export function logout() {
    return request.post(API.logout);
}

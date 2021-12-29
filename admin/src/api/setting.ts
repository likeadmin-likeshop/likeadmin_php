import request from "@/utils/request";

// 获取备案信息
export function apiGetCopyright(){
    return request.get("/setting.web.web_setting/getCopyright");
}
// 设置备案信息
export function apiSetCopyright(params: any) {
    return request.post("/setting.web.web_setting/setCopyright", { ...params });
}


// 获取网站信息
export function apiGetWebsite(){
    return request.get("/settings.web.web_setting/getWebsite");
}
// 设置网站信息
export function apiSetWebsite(params: any) {
    return request.post("/setting.web.web_setting/setWebsite", { ...params });
}


// 获取系统环境
export function apiSystemInfo(){
    return request.get("/setting.system.system/info");
}

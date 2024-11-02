import { isDevMode } from "@/utils/env";
const envBaseUrl = import.meta.env.VITE_APP_BASE_URL || "";

let baseUrl = `${envBaseUrl}/`;

/*
 * 微信小程序在`VITE_APP_BASE_URL`存在或`dev`模式下
 * 使用`VITE_APP_BASE_URL`的值
 * 其他情况使用`[baseUrl]`，方便服务端替换
 */

//#ifdef MP-WEIXIN
baseUrl = isDevMode() || envBaseUrl ? baseUrl : "[baseUrl]";
//#endif

const config = {
    version: "1.9.0", //版本号
    baseUrl, //请求接口域名
    urlPrefix: "api", //请求默认前缀
    timeout: 60 * 1000, //请求超时时长
};

export default config;

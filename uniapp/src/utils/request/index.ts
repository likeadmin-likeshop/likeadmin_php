import HttpRequest from "./http";
import { merge } from "lodash-es";
import { HttpRequestOptions, RequestHooks } from "./type";
import { getToken } from "../auth";
import { RequestCodeEnum, RequestMethodsEnum } from "@/enums/requestEnums";
import { useUserStore } from "@/stores/user";
import appConfig from "@/config";
import { getClient } from "../client";

const requestHooks: RequestHooks = {
    requestInterceptorsHook(options, config) {
        const { urlPrefix, baseUrl, withToken, isAuth } = config;
        options.header = options.header ?? {};
        if (urlPrefix) {
            options.url = `${urlPrefix}${options.url}`;
        }
        if (baseUrl) {
            options.url = `${baseUrl}${options.url}`;
        }
        const token = getToken();
        // 添加token
        if (withToken && !options.header.token) {
            options.header.token = token;
        }
        options.header.version = appConfig.version;
        // options.header.terminal = getClient();
        return options;
    },
    async responseInterceptorsHook(response, config) {
        const { isTransformResponse, isReturnDefaultResponse, isAuth } = config;

        //返回默认响应，当需要获取响应头及其他数据时可使用
        if (isReturnDefaultResponse) {
            return response;
        }
        // 是否需要对数据进行处理
        if (!isTransformResponse) {
            return response.data;
        }
        const { logout } = useUserStore();
        const { code, data, msg, show } = response.data as any;
        switch (code) {
            case RequestCodeEnum.SUCCESS:
                msg && show && uni.$u.toast(msg);
                return data;
            case RequestCodeEnum.FAILED:
                uni.$u.toast(msg);
                return Promise.reject(msg);

            case RequestCodeEnum.TOKEN_INVALID:
                logout();
                if (isAuth && !getToken()) {
                    uni.navigateTo({
                        url: "/pages/login/login",
                    });
                }
                return Promise.reject(msg);

            default:
                return data;
        }
    },
    async responseInterceptorsCatchHook(options, error) {
        if (options.method?.toUpperCase() == RequestMethodsEnum.POST) {
            uni.$u.toast("请求失败，请重试");
        }
        return Promise.reject(error);
    },
};

const defaultOptions: HttpRequestOptions = {
    requestOptions: {
        timeout: appConfig.timeout,
    },
    baseUrl: appConfig.baseUrl,
    //是否返回默认的响应
    isReturnDefaultResponse: false,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // 接口拼接地址
    urlPrefix: "api",
    // 忽略重复请求
    ignoreCancel: false,
    // 是否携带token
    withToken: true,
    isAuth: false,
    retryCount: 2,
    retryTimeout: 1000,
    requestHooks: requestHooks,
};

function createRequest(opt?: HttpRequestOptions) {
    return new HttpRequest(
        // 深度合并
        merge(defaultOptions, opt || {})
    );
}
const request = createRequest();
export default request;

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

import 'axios'
declare module 'axios' {
    // 扩展 RouteMeta
    interface AxiosRequestConfig {
        retryCount?: number
        axiosHooks?: AxiosHooks
        requestOptions: RequestOptions
    }
}

export interface RequestOptions {
    isParamsToData: boolean
    isReturnDefaultResponse: boolean
    isTransformResponse: boolean
    urlPrefix: string
    ignoreCancelToken: boolean
    withToken: boolean
    isOpenRetry: boolean
    retryCount: number
}

export interface AxiosHooks {
    requestInterceptorsHook?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorsCatchHook?: (error: Error) => void
    responseInterceptorsHook?: (
        response: AxiosResponse<RequestData<T>>
    ) => AxiosResponse<RequestData> | RequestData | T
    responseInterceptorsCatchHook?: (error: AxiosError) => void
}

export interface RequestData<T = any> {
    code: number
    data: T
    msg: string
    show: boolean
}

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestOptions {
    isReturnDefaultResponse: boolean
    isTransformResponse: boolean
    urlPrefix: string
    ignoreCancelToken: boolean
    withToken: boolean
    isOpenRetry: boolean
    retryCount: number
}

export interface AxiosConfig extends AxiosRequestConfig {
    retryCount?: number
    axiosHooks?: AxiosHooks
    requestOptions: RequestOptions
}

export interface AxiosHooks {
    requestInterceptorsHook?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorsCatchHook?: (error: Error) => void
    responseInterceptorsHook?: (
        response: AxiosResponse<RequestData<T>>
    ) => AxiosResponse<RequestData> | RequestData | T
    responseInterceptorsCatchHook?: (error: Error) => void
}

export interface RequestData<T = any> {
    code: number
    data: T
    msg: string
    show: boolean
}

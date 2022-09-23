export type RequestOptions = UniApp.RequestOptions
export type ResponseResult = UniApp.RequestSuccessCallbackResult
export type ResponseError = UniApp.GeneralCallbackResult
export type RequestTask = UniApp.RequestTask
export interface HttpRequestOptions extends RequestConfig {
    requestOptions: Partial<RequestOptions>
}

export interface RequestConfig {
    baseUrl: string
    requestHooks: RequestHooks
    isReturnDefaultResponse: boolean
    isTransformResponse: boolean
    urlPrefix: string
    ignoreCancel: boolean
    withToken: boolean
    isAuth: boolean
}

export interface RequestHooks {
    requestInterceptorsHook?(options: RequestOptions, config: RequestConfig): RequestOptions
    responseInterceptorsHook?(response: ResponseResult, config: RequestConfig): any
    responseInterceptorsCatchHook?(error: ResponseError, config: RequestConfig): any
}

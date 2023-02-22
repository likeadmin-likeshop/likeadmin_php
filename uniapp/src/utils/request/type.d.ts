export type RequestOptions = UniApp.RequestOptions
export type ResponseResult =
    | UniApp.RequestSuccessCallbackResult
    | UniApp.UploadFileSuccessCallbackResult
export type RequestOptionsResponseError = UniApp.GeneralCallbackResult
export type RequestTask = UniApp.RequestTask
export type UploadFileOption = UniApp.UploadFileOption
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
    retryCount: number
    retryTimeout: number
    hasRetryCount?: number
}

export interface RequestHooks {
    requestInterceptorsHook?(options: RequestOptions, config: RequestConfig): RequestOptions
    responseInterceptorsHook?(response: ResponseResult, config: RequestConfig): any
    responseInterceptorsCatchHook?(options: RequestOptions, error: any): any
}

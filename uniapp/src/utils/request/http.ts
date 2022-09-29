import { merge } from 'lodash-es'
import { isFunction } from '@vue/shared'
import { HttpRequestOptions, RequestConfig, RequestOptions } from './type'
import { RequestErrMsgEnum, RequestMethodsEnum } from '@/enums/requestEnums'
import requestCancel from './cancel'

export default class HttpRequest {
    private readonly options: HttpRequestOptions
    constructor(options: HttpRequestOptions) {
        this.options = options
    }
    /**
     * @description 重新请求
     */
    retryRequest(options: RequestOptions, config: RequestConfig) {
        const { retryCount, retryTimeout } = config
        if (!retryCount || options.method?.toUpperCase() == RequestMethodsEnum.POST) {
            return Promise.reject()
        }
        uni.showLoading({ title: '加载中...' })
        config.hasRetryCount = config.hasRetryCount ?? 0
        if (config.hasRetryCount >= retryCount) {
            return Promise.reject()
        }
        config.hasRetryCount++
        config.requestHooks.requestInterceptorsHook = (options) => options
        return new Promise((resolve) => setTimeout(resolve, retryTimeout))
            .then(() => this.request(options, config))
            .finally(() => uni.hideLoading())
    }
    /**
     * @description get请求
     */
    get<T = any>(options: RequestOptions, config?: Partial<RequestConfig>): Promise<T> {
        return this.request({ ...options, method: RequestMethodsEnum.GET }, config)
    }

    /**
     * @description post请求
     */
    post<T = any>(options: RequestOptions, config?: Partial<RequestConfig>): Promise<T> {
        return this.request({ ...options, method: RequestMethodsEnum.POST }, config)
    }
    /**
     * @description 请求函数
     */
    async request(options: RequestOptions, config?: Partial<RequestConfig>): Promise<any> {
        let mergeOptions: RequestOptions = merge({}, this.options.requestOptions, options)
        const mergeConfig: RequestConfig = merge({}, this.options, config)
        const { requestInterceptorsHook, responseInterceptorsHook, responseInterceptorsCatchHook } =
            mergeConfig.requestHooks || {}
        if (requestInterceptorsHook && isFunction(requestInterceptorsHook)) {
            mergeOptions = requestInterceptorsHook(mergeOptions, mergeConfig)
        }
        return new Promise((resolve, reject) => {
            const requestTask = uni.request({
                ...mergeOptions,
                success(response) {
                    if (responseInterceptorsHook && isFunction(responseInterceptorsHook)) {
                        try {
                            response = responseInterceptorsHook(response, mergeConfig)
                            resolve(response)
                        } catch (error) {
                            reject(error)
                        }
                        return
                    }
                    resolve(response)
                },
                fail: (err) => {
                    if (err.errMsg == RequestErrMsgEnum.TIMEOUT) {
                        this.retryRequest(mergeOptions, mergeConfig)
                            .then((res) => resolve(res))
                            .catch((err) => reject(err))
                        return
                    }

                    if (
                        responseInterceptorsCatchHook &&
                        isFunction(responseInterceptorsCatchHook)
                    ) {
                        reject(responseInterceptorsCatchHook(mergeOptions, mergeConfig))
                        return
                    }
                    reject(err)
                },
                complete(err) {
                    if (err.errMsg !== RequestErrMsgEnum.ABORT) {
                        requestCancel.remove(options.url)
                    }
                }
            })
            const { ignoreCancel } = mergeConfig
            !ignoreCancel && requestCancel.add(options.url, requestTask)
        })
    }
}

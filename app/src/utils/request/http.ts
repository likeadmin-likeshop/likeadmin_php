import { merge } from 'lodash-es'
import { isFunction } from '@vue/shared'
import { HttpRequestOptions, RequestConfig, RequestOptions } from './type'
import { RequestMethodsEnum } from '@/enums/requestEnums'
import requestCancel from './cancel'

export default class HttpRequest {
    private readonly options: HttpRequestOptions
    constructor(options: HttpRequestOptions) {
        this.options = options
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
            mergeOptions = requestInterceptorsHook(options, mergeConfig)
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
                fail(err) {
                    if (
                        responseInterceptorsCatchHook &&
                        isFunction(responseInterceptorsCatchHook)
                    ) {
                        reject(responseInterceptorsCatchHook(err, mergeConfig))
                        return
                    }
                    reject(err)
                },
                complete(err) {
                    if (err.errMsg !== 'request:fail abort') {
                        requestCancel.remove(options.url)
                    }
                }
            })
            const { ignoreCancel } = mergeConfig
            !ignoreCancel && requestCancel.add(options.url, requestTask)
        })
    }
}

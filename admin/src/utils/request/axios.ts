import { RequestMethodsEnum } from '@/enums/requestEnums'
import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse
} from 'axios'
import { isFunction, merge, cloneDeep } from 'lodash'
import axiosCancel from './cancel'
import type { AxiosConfig, RequestData, RequestOptions } from './type'

export class Axios {
    private axiosInstance: AxiosInstance
    private readonly config: AxiosConfig
    private readonly options: RequestOptions
    constructor(config: AxiosConfig) {
        this.config = config
        this.options = config.requestOptions
        this.axiosInstance = axios.create(config)
        this.setupInterceptors()
    }

    /**
     * @description 获取axios实例
     */
    getAxiosInstance() {
        return this.axiosInstance
    }

    /**
     * @description 设置拦截器
     */
    setupInterceptors() {
        if (!this.config.axiosHooks) {
            return
        }
        const {
            requestInterceptorsHook,
            requestInterceptorsCatchHook,
            responseInterceptorsHook,
            responseInterceptorsCatchHook
        } = this.config.axiosHooks
        this.axiosInstance.interceptors.request.use(
            (config) => {
                this.addCancelToken(config as AxiosConfig)
                if (isFunction(requestInterceptorsHook)) {
                    config = requestInterceptorsHook(config)
                }
                return config
            },
            (err: Error) => {
                if (isFunction(requestInterceptorsCatchHook)) {
                    requestInterceptorsCatchHook(err)
                }
                return err
            }
        )
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse<RequestData>) => {
                this.removeCancelToken(response.config as AxiosConfig)
                if (isFunction(responseInterceptorsHook)) {
                    response = responseInterceptorsHook(response)
                }
                return response
            },
            (err: AxiosError) => {
                console.log(err)
                if (
                    err.code == AxiosError.ERR_BAD_RESPONSE ||
                    err.code == AxiosError.ERR_BAD_REQUEST
                ) {
                    this.removeCancelToken(err.config as AxiosConfig)

                    if (isFunction(responseInterceptorsCatchHook)) {
                        responseInterceptorsCatchHook(err)
                    }
                    this.retryRequest(err)
                    return Promise.reject(err)
                }
                return Promise.reject(err)
            }
        )
    }

    /**
     * @description 添加CancelToken
     */
    addCancelToken(config: AxiosConfig) {
        const { ignoreCancelToken } = config.requestOptions
        !ignoreCancelToken && axiosCancel.add(config)
    }

    /**
     * @description 移除CancelToken
     */
    removeCancelToken(config: AxiosConfig) {
        const { ignoreCancelToken } = config.requestOptions
        !ignoreCancelToken && axiosCancel.remove(config)
    }

    /**
     * @description 重新请求
     */
    retryRequest(error: AxiosError) {
        const config = error.config as AxiosConfig
        const { retryCount, isOpenRetry } = config.requestOptions
        if (!isOpenRetry && config.method?.toUpperCase() == RequestMethodsEnum.POST) {
            return
        }
        config.retryCount = config.retryCount ?? 0

        if (config.retryCount >= retryCount) {
            return
        }
        config.retryCount++
        this.axiosInstance.request(config)
    }
    /**
     * @description get请求
     */
    get<T = any>(config: AxiosRequestConfig, options?: Partial<RequestOptions>): Promise<T> {
        return this.request({ ...config, method: RequestMethodsEnum.GET }, options)
    }

    /**
     * @description post请求
     */
    post<T = any>(config: AxiosRequestConfig, options?: Partial<RequestOptions>): Promise<T> {
        return this.request({ ...config, method: RequestMethodsEnum.POST }, options)
    }

    /**
     * @description 请求函数
     */
    request<T = any>(config: AxiosRequestConfig, options?: Partial<RequestOptions>): Promise<any> {
        const opt: RequestOptions = merge({}, this.options, options)
        const axioxConfig: AxiosConfig = {
            ...cloneDeep(config),
            requestOptions: opt
        }
        const { urlPrefix } = opt
        // 拼接请求前缀如api
        if (urlPrefix) {
            axioxConfig.url = `${urlPrefix}${config.url}`
        }
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<RequestData<T>>>(axioxConfig)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}

import {
    FetchOptions,
    $fetch,
    $Fetch,
    FetchResponse,
    RequestOptions,
    FileParams
} from 'ohmyfetch'
import { merge } from 'lodash-es'
import { isFunction } from '../validate'
import { RequestMethodsEnum } from '@/enums/requestEnums'

export class Request {
    private requestOptions: RequestOptions
    private fetchInstance: $Fetch
    constructor(private fetchOptions: FetchOptions) {
        this.fetchInstance = $fetch.create(fetchOptions)
        this.requestOptions = fetchOptions.requestOptions
    }

    getInstance() {
        return this.fetchInstance
    }
    /**
     * @description get请求
     */
    get(fetchOptions: FetchOptions, requestOptions?: Partial<RequestOptions>) {
        return this.request(
            { ...fetchOptions, method: RequestMethodsEnum.GET },
            requestOptions
        )
    }

    /**
     * @description post请求
     */
    post(fetchOptions: FetchOptions, requestOptions?: Partial<RequestOptions>) {
        return this.request(
            { ...fetchOptions, method: RequestMethodsEnum.POST },
            requestOptions
        )
    }
    /**
     * @description: 文件上传
     */
    uploadFile(options: FetchOptions, params: FileParams) {
        const formData = new FormData()
        const customFilename = params.name || 'file'
        formData.append(customFilename, params.file)
        if (params.data) {
            Object.keys(params.data).forEach((key) => {
                const value = params.data![key]
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(`${key}[]`, item)
                    })
                    return
                }

                formData.append(key, params.data![key])
            })
        }
        return this.request({
            ...options,
            method: RequestMethodsEnum.POST,
            body: formData
        })
    }
    /**
     * @description 请求函数
     */
    request(
        fetchOptions: FetchOptions,
        requestOptions?: Partial<RequestOptions>
    ): Promise<any> {
        let mergeOptions = merge({}, this.fetchOptions, fetchOptions)
        mergeOptions.requestOptions = merge(
            {},
            this.requestOptions,
            requestOptions
        )

        const {
            requestInterceptorsHook,
            responseInterceptorsHook,
            responseInterceptorsCatchHook
        } = this.requestOptions
        if (requestInterceptorsHook && isFunction(requestInterceptorsHook)) {
            mergeOptions = requestInterceptorsHook(mergeOptions)
        }
        return new Promise((resolve, reject) => {
            return this.fetchInstance
                .raw(mergeOptions.url, mergeOptions)
                .then(async (response: FetchResponse<any>) => {
                    if (
                        responseInterceptorsHook &&
                        isFunction(responseInterceptorsHook)
                    ) {
                        try {
                            response = await responseInterceptorsHook(
                                response,
                                mergeOptions
                            )
                            resolve(response)
                        } catch (error) {
                            reject(error)
                        }
                        return
                    }
                    resolve(response)
                })
                .catch((err) => {
                    if (
                        responseInterceptorsCatchHook &&
                        isFunction(responseInterceptorsCatchHook)
                    ) {
                        reject(responseInterceptorsCatchHook(err))
                        return
                    }
                    reject(err)
                })
        })
    }
}

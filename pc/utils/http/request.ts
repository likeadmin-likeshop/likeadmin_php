import { FetchOptions, $fetch, $Fetch, FetchResponse } from 'ohmyfetch'
import { merge } from 'lodash-es'
import { isFunction } from '../validate'
import { RequestOptions } from '@/typings/fetch'
import { ContentTypeEnum, RequestMethodsEnum } from '@/enums/requestEnums'

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
    uploadFile(options: FetchOptions, params: { name: string; file: any }) {
        const formData = new FormData()
        const customFilename = params.name || 'file'
        formData.append(customFilename, params.file)
        return this.request({
            ...options,
            method: RequestMethodsEnum.POST,
            body: formData,
            headers: {
                'content-type': ContentTypeEnum.FORM_DATA
            }
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

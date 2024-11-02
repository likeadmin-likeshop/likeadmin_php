import { FetchOptions } from 'ofetch'
import { RequestCodeEnum, RequestMethodsEnum } from '@/enums/requestEnums'
import feedback from '@/utils/feedback'
import { merge } from 'lodash-es'
import { Request } from './request'
import { getApiPrefix, getApiUrl, getVersion } from '../env'
import { useUserStore } from '@/stores/user'

export function createRequest(opt?: Partial<FetchOptions>) {
    const userStore = useUserStore()
    // const { setPopupType, toggleShowPopup } = useAccount()
    const defaultOptions: FetchOptions = {
        // 基础接口地址
        baseURL: getApiUrl(),
        //请求头
        headers: {
            version: getVersion()
        },
        retry: 2,
        requestOptions: {
            apiPrefix: getApiPrefix(),
            isTransformResponse: true,
            isReturnDefaultResponse: false,
            withToken: true,
            isParamsToData: true,
            requestInterceptorsHook(options) {
                const { apiPrefix, isParamsToData, withToken } =
                    options.requestOptions
                // 拼接请求前缀
                if (apiPrefix) {
                    options.url = `${apiPrefix}${options.url}`
                }
                const params = options.params || {}
                // POST请求下如果无data，则将params视为data
                if (
                    isParamsToData &&
                    !Reflect.has(options, 'body') &&
                    options.method?.toUpperCase() === RequestMethodsEnum.POST
                ) {
                    options.body = params
                    options.params = {}
                }
                const headers = options.headers || {}
                if (withToken) {
                    const token = userStore.token
                    headers['token'] = token
                }
                options.headers = headers
                return options
            },
            async responseInterceptorsHook(response, options) {
                const { isTransformResponse, isReturnDefaultResponse } =
                    options.requestOptions
                //返回默认响应，当需要获取响应头及其他数据时可使用
                if (isReturnDefaultResponse) {
                    return response
                }
                // 是否需要对数据进行处理
                if (!isTransformResponse) {
                    return response._data
                }
                const { code, data, show, msg } = response._data
                switch (code) {
                    case RequestCodeEnum.SUCCESS:
                        if (show) {
                            msg && feedback.msgSuccess(msg)
                        }
                        return data
                    case RequestCodeEnum.FAIL:
                        if (show) {
                            msg && feedback.msgError(msg)
                        }
                        return Promise.reject(msg)
                    case RequestCodeEnum.LOGIN_FAILURE:
                        userStore.logout()
                        return Promise.reject(data)
                    default:
                        return data
                }
            },
            responseInterceptorsCatchHook(err) {
                return err
            }
        }
    }
    return new Request(
        // 深度合并
        merge(defaultOptions, opt || {})
    )
}

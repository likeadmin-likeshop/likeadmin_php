import 'ofetch'
import { FetchResponse, FetchOptions } from 'ofetch'

declare module 'ofetch' {
    interface FetchOptions {
        url?: string
        requestOptions?: RequestOptions
    }
    interface RequestOptions {
        // 请求接口前缀
        apiPrefix?: string
        // 需要对返回数据进行处理
        isTransformResponse?: boolean
        // 是否返回默认数据
        isReturnDefaultResponse?: boolean
        //POST请求下如果无data，则将params视为data
        isParamsToData?: boolean
        // 是否自动携带token
        withToken?: boolean
        requestInterceptorsHook?(options: FetchOptions): FetchOptions
        responseInterceptorsHook?(
            response: FetchResponse<any>,
            options: FetchOptions
        ): any
        responseInterceptorsCatchHook?: (error: any) => void
    }

    interface RequestEventStreamOptions extends Partial<RequestOptions> {
        onstart?: (reader: ReadableStreamDefaultReader<Uint8Array>) => void
        onmessage?: (value: string) => void
        onclose?: () => void
    }
    interface FileParams {
        name?: string
        file: File
        data?: any
    }
}

import { createRequest } from '~~/utils/http'

export default defineNuxtPlugin(() => {
    const request = createRequest()
    //@ts-ignore 添加
    globalThis.$request = request

    const $fetchOriginal = globalThis.$fetch
    const $fetch: any = (url: string, opts?: any) => {
        opts = opts ?? {}
        opts.url = url
        return request.request(opts, opts.requestOptions)
    }
    $fetch.raw = $fetchOriginal.raw
    $fetch.create = $fetchOriginal.create
    //@ts-ignore 重写$fetch
    globalThis.$fetch = $fetch
})

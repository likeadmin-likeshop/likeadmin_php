/**
 * @description 获取客户端类型
 */
export function getClient() {
    return useRuntimeConfig().public.client
}

/**
 * @description 获取版本号
 */
export function getVersion() {
    return useRuntimeConfig().public.version
}

/**
 * @description 获取请求域名
 */
export function getApiUrl() {
    return useRuntimeConfig().public.apiUrl
}

/**
 * @description 获取请求前缀
 */
export function getApiPrefix() {
    return useRuntimeConfig().public.apiPrefix
}

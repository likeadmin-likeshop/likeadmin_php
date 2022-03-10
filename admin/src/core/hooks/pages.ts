import { deepClone } from '@/utils/util'
import { reactive, toRaw } from 'vue'

// 分页钩子函数
interface Options {
    page?: number
    size?: number
    callback: (_arg: any) => Promise<any>
    params?: Record<any, any>
}

let paramsInit: Record<any, any> = {}

export function usePages(options: Options) {
    const { page = 1, size = 15, callback, params = {} } = options
    // 记录分页初始参数
    paramsInit = Object.assign({}, toRaw(params))
    // 分页数据
    const pager = reactive({
        page,
        size,
        loading: false,
        count: 0,
        lists: [] as any[]
    })
    // 请求分页接口
    const requestApi = () => {
        // 禁止并发请求
        if (pager.loading) {
            return Promise.reject()
        }
        pager.loading = true
        return callback({
            page_no: pager.page,
            page_size: pager.size,
            ...params
        })
            .then((res: any) => {
                pager.count = res?.count
                pager.lists = res?.lists
                return Promise.resolve(res)
            })
            .catch((err: any) => {
                return Promise.reject(err)
            })
            .finally(() => {
                pager.loading = false
            })
    }
    // 重置为第一页
    const resetPage = () => {
        pager.page = 1
        requestApi()
    }
    // 重置参数
    const resetParams = () => {
        Object.keys(paramsInit).forEach(item => {
            params[item] = paramsInit[item]
        })
        requestApi()
    }
    return {
        pager,
        requestApi,
        resetParams,
        resetPage
    }
}

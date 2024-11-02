import { reactive, toRaw } from 'vue'

// 分页钩子函数
interface Options {
    page?: number
    size?: number
    fetchFun: (_arg: any) => Promise<any>
    params?: Record<any, any>
    fixedParams?: Record<any, any>
    firstLoading?: boolean
}

export function usePaging(options: Options) {
    const {
        page = 1,
        size = 15,
        fetchFun,
        params = {},
        fixedParams = {},
        firstLoading = false
    } = options
    // 记录分页初始参数
    const paramsInit: Record<any, any> = Object.assign({}, toRaw(params))
    // 分页数据
    const pager = reactive({
        page,
        size,
        loading: firstLoading,
        count: 0,
        lists: [] as any[],
        extend: {} as Record<string, any>
    })
    // 请求分页接口
    const getLists = () => {
        pager.loading = true
        return fetchFun({
            page_no: pager.page,
            page_size: pager.size,
            ...params,
            ...fixedParams
        })
            .then((res: any) => {
                pager.count = res?.count
                pager.lists = res?.lists
                pager.extend = res?.extend
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
        getLists()
    }
    // 重置参数
    const resetParams = () => {
        Object.keys(paramsInit).forEach((item) => {
            params[item] = paramsInit[item]
        })
        getLists()
    }
    return {
        pager,
        getLists,
        resetParams,
        resetPage
    }
}

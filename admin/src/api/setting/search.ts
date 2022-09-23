import request from '@/utils/request'

/**
 * @return { Promise }
 * @description 获取热门搜索数据
 */
export function getSearch() {
    return request.get({ url: '/setting.hot_search/getConfig' })
}

export interface List {
    name: string // 搜索关键字
    sort: number // 热门搜索排序
}

export interface Search {
    status: number // 是否开启搜索0/1
    data: List[]
}
/**
 * @return { Promise }
 * @param { Search } Search
 * @description 设置热门搜索
 */
export function setSearch(params: Search) {
    return request.post({ url: '/setting.hot_search/setConfig', params })
}

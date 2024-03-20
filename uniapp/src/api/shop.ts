import request from '@/utils/request'

//首页数据
export function getIndex() {
    return request.get({ url: '/index/index' })
}

// 装修页面
export function getDecorate(data: any) {
    return request.get({ url: '/index/decorate', data }, { ignoreCancel: true })
}

/**
 * @description 热门搜索
 * @return { Promise }
 */
export function getHotSearch() {
    return request.get({ url: '/search/hotLists' })
}

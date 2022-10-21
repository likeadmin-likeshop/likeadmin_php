/**
 * @description 获取文章列表
 * @return { Promise }
 */
export function getArticleList(params) {
    return $request.get({ url: '/article/lists', params })
}

/**
 * @description 获取资讯中心
 * @return { Promise }
 */
export function getArticleCenter() {
    return $request.get({ url: '/pc/infoCenter' })
}

/**
 * @description 文章详情
 * @return { Promise }
 */
export function getArticleDetail(params) {
    return $request.get({ url: '/pc/articleDetail', params })
}

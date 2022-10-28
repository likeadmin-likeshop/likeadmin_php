/**
 * @description 获取文章分类
 * @return { Promise }
 */
export function getArticleCate() {
    return $request.get({ url: '/article/cate' })
}

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

/**
 * @description 加入收藏
 * @param { number } id
 * @return { Promise }
 */
export function addCollect(params) {
    return $request.post({ url: '/article/addCollect', params })
}

/**
 * @description 取消收藏
 * @param { number } id
 * @return { Promise }
 */
export function cancelCollect(params) {
    return $request.post({ url: '/article/cancelCollect', params })
}

/**
 * @description 获取收藏列表
 * @return { Promise }
 */
export function getCollect(params) {
    return $request.get({ url: '/article/collect', params })
}

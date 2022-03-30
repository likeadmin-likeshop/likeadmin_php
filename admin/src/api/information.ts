import request from '@/utils/request'

/** 资讯分类 Start **/
// 列表
export function apiArticleCategoryList(params: any) {
    return request.get('/article.articleCategory/lists', { params })
}

// 添加
export function apiArticleCategoryAdd(params: any) {
    return request.post('/article.articleCategory/add', params)
}

// 编辑
export function apiArticleCategoryEdit(params: any) {
    return request.post('/article.articleCategory/edit', params)
}

// 详情
export function apiArticleCategoryDetail(params: any) {
    return request.get('/article.articleCategory/detail', { params })
}

// 删除
export function apiArticleCategoryDelete(params: any) {
    return request.post('/article.articleCategory/delete', params)
}

// 状态
export function apiArticleCategoryStatus(params: any) {
    return request.post('/article.articleCategory/updateStatus', params)
}
/** 资讯分类 End **/

/** 资讯列表 Start **/
// 列表
export function apiArticleList(params: any) {
    return request.get('/article.article/lists', { params })
}

// 添加
export function apiArticleAdd(params: any) {
    return request.post('/article.article/add', params)
}

// 编辑
export function apiArticleEdit(params: any) {
    return request.post('/article.article/edit', params)
}

// 详情
export function apiArticleDetail(params: any) {
    return request.get('/article.article/detail', { params })
}

// 删除
export function apiArticleDelete(params: any) {
    return request.post('/article.article/delete', params)
}

// 状态
export function apiArticleStatus(params: any) {
    return request.post('/article.article/updateStatus', params)
}

// 所有资讯分类
export function apiAllArticleCategory() {
    return request.get('/article.articleCategory/selectArticleCategory')
}
/** 资讯列表 End **/

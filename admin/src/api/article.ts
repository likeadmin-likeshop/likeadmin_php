import request from '@/utils/request'

// 文章分类列表
export function articleCateLists(params?: any) {
    return request.get({ url: '/article.articleCate/lists', params })
}
// 文章分类列表
export function articleCateAll(params?: any) {
    return request.get({ url: '/article.articleCate/all', params })
}

// 添加文章分类
export function articleCateAdd(params: any) {
    return request.post({ url: '/article.articleCate/add', params })
}

// 编辑文章分类
export function articleCateEdit(params: any) {
    return request.post({ url: '/article.articleCate/edit', params })
}

// 删除文章分类
export function articleCateDelete(params: any) {
    return request.post({ url: '/article.articleCate/delete', params })
}

// 文章分类详情
export function articleCateDetail(params: any) {
    return request.get({ url: '/article.articleCate/detail', params })
}

// 文章分类状态
export function articleCateStatus(params: any) {
    return request.post({ url: '/article.articleCate/updateStatus', params })
}

// 文章列表
export function articleLists(params?: any) {
    return request.get({ url: '/article.article/lists', params })
}
// 文章列表
export function articleAll(params?: any) {
    return request.get({ url: '/article/all', params })
}

// 添加文章
export function articleAdd(params: any) {
    return request.post({ url: '/article.article/add', params })
}

// 编辑文章
export function articleEdit(params: any) {
    return request.post({ url: '/article.article/edit', params })
}

// 删除文章
export function articleDelete(params: any) {
    return request.post({ url: '/article.article/delete', params })
}

// 文章详情
export function articleDetail(params: any) {
    return request.get({ url: '/article.article/detail', params })
}

// 文章分类状态
export function articleStatus(params: any) {
    return request.post({ url: '/article.article/updateStatus', params })
}

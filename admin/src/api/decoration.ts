/* 装修管理 */
import request from '@/utils/request'

/* 首页装修 Start */
// 列表
export function apiHomeMenuLists() {
    return request.get('/decorate.menu/lists')
}

// 商城页面列表
export function apiShowPage() {
    return request.get('/decorate.menu/shopPage')
}

// 商品分类一级页面
export function apiGoodsCategoryPage() {
    return request.get('/decorate.menu/goodsCategoryPage')
}

// 详情
export function apiHomeMenuDetail(params: any) {
    return request.get('/decorate.menu/detail', { params })
}

// 添加
export function apiHomeMenuAdd(params: any) {
    return request.post('/decorate.menu/add', params)
}

// 编辑
export function apiHomeMenuEdit(params: any) {
    return request.post('/decorate.menu/edit', params)
}

// 状态
export function apiHomeMenuStatusEdit(params: any) {
    return request.post('/decorate.menu/status', params)
}

// 删除
export function apiHomeMenuDel(params: any) {
    return request.post('/decorate.menu/del', params)
}

/* 首页装修 End */

/* 底部导航 Start */
// 列表
export function apiTabBarLists() {
    return request.get('/decorate.navigation/lists')
}

// 详情
export function apiTabBarDetail(params: any) {
    return request.get('/decorate.navigation/detail', { params })
}

// 编辑
export function apiTabBarEdit(params: any) {
    return request.post('/decorate.navigation/edit', params)
}

/* 底部导航 End */

/* 广告管理 Start */
// 列表
export function apiAdLists(params: any) {
    return request.get('/ad.ad/lists', { params })
}

// 广告位列表
export function apiAdPositionLists() {
    return request.get('/ad.ad_position/lists')
}

// 详情
export function apiAdDetail(params: any) {
    return request.get('/ad.ad/detail', { params })
}

// 添加
export function apiAdAdd(params: any) {
    return request.post('/ad.ad/add', params)
}

// 删除
export function apiAdDel(params: any) {
    return request.post('/ad.ad/del', params)
}

// 状态修改
export function apiAdEditStatus(params: any) {
    return request.post('/ad.ad/status', params)
}

// 编辑
export function apiAdEdit(params: any) {
    return request.post('/ad.ad/edit', params)
}

/* 广告管理 End */

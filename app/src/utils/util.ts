import { isObject } from '@vue/shared'
import { getToken } from './auth'

/**
 * @description 获取元素节点信息（在组件中的元素必须要传ctx）
 * @param  { String } selector 选择器 '.app' | '#app'
 * @param  { Boolean } all 是否多选
 * @param  { ctx } context 当前组件实例
 */
export const getRect = (selector: string, all = false, context?: any) => {
    return new Promise((resolve, reject) => {
        let qurey = uni.createSelectorQuery()
        if (context) {
            qurey = uni.createSelectorQuery().in(context)
        }
        qurey[all ? 'selectAll' : 'select'](selector)
            .boundingClientRect(function (rect) {
                if (all && Array.isArray(rect) && rect.length) {
                    return resolve(rect)
                }
                if (!all && rect) {
                    return resolve(rect)
                }
                reject('找不到元素')
            })
            .exec()
    })
}

/**
 * @description 获取当前页面实例
 */
export function currentPage() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    return currentPage || {}
}

/**
 * @description 后台选择链接专用跳转
 */
interface Link {
    path: string
    name?: string
    type: string
    isTab: boolean
    query?: Record<string, any>
}

export enum LinkTypeEnum {
    'SHOP_PAGES' = 'shop',
    'CUSTOM_LINK' = 'custom'
}

export function navigateTo(link: Link, navigateType: 'navigateTo' | 'reLaunch' = 'navigateTo') {
    const url = link.query ? `${link.path}?${objectToQuery(link.query)}` : link.path
    navigateType == 'navigateTo' && uni.navigateTo({ url })
    navigateType == 'reLaunch' && uni.reLaunch({ url })
}

/**
 * @description 是否为空
 * @param {unknown} value
 * @return {Boolean}
 */
export const isEmpty = (value: unknown) => {
    return value == null && typeof value == 'undefined'
}

/**
 * @description 对象格式化为Query语法
 * @param { Object } params
 * @return {string} Query语法
 */
export function objectToQuery(params: Record<string, any>): string {
    let query = ''
    for (const props of Object.keys(params)) {
        const value = params[props]
        const part = encodeURIComponent(props) + '='
        if (!isEmpty(value)) {
            console.log(encodeURIComponent(props), isObject(value))
            if (isObject(value)) {
                for (const key of Object.keys(value)) {
                    if (!isEmpty(value[key])) {
                        const params = props + '[' + key + ']'
                        const subPart = encodeURIComponent(params) + '='
                        query += subPart + encodeURIComponent(value[key]) + '&'
                    }
                }
            } else {
                query += part + encodeURIComponent(value) + '&'
            }
        }
    }
    return query.slice(0, -1)
}
/**
 * @description 上传图片
 * @param  { String } path 选择的本地地址
 */
export function uploadFile(path: any) {
    return new Promise((resolve, reject) => {
        const token = getToken()
        uni.uploadFile({
            url: `${import.meta.env.VITE_APP_BASE_URL}/api/upload/image`,
            filePath: path,
            name: 'file',
            header: {
                token
            },
            fileType: 'image',
            success: (res) => {
                console.log('uploadFile res ==> ', res)
                const data = JSON.parse(res.data)
                if (data.code == 1) {
                    resolve(data.data)
                } else {
                    reject()
                }
            },
            fail: (err) => {
                console.log(err)
                reject()
            }
        })
    })
}

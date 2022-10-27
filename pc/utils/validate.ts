export {
    isArray,
    isBoolean,
    isDate,
    isObject,
    isFunction,
    isString,
    isNumber,
    isNull
} from 'lodash-es'
import { isObject } from 'lodash-es'
/**
 * @description 是否是http，邮件，电话号码
 */
export function isExternal(path: string) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description 是否是http
 */
export const isLinkHttp = (link: string): boolean =>
    /^(https?:)?\/\//.test(link)

/**
 * @description 是否是电话号码
 */
export const isLinkTel = (link: string): boolean => /^tel:/.test(link)

/**
 * @description 是否是邮件
 */
export const isLinkMailto = (link: string): boolean => /^mailto:/.test(link)

/**
 * @description 是否为空
 * @param {unknown} value
 * @return {Boolean}
 */
export const isEmpty = (value: unknown) => {
    return value !== null && value !== '' && typeof value !== 'undefined'
}
/**
 * @description 是否为空对象
 * @param {Object} value
 * @return {Boolean}
 */
export const isEmptyObject = (target: object) => {
    return isObject(target) && !Object.keys(target).length
}

/**
 * @description: 开发模式
 */
export function isDevMode(): boolean {
    return import.meta.env.DEV
}

/**
 * @description: 生成模式
 */
export function isProdMode(): boolean {
    return import.meta.env.PROD
}

import { ClientEnum } from '@/enums/appEnums'

/**
 * @description 判断是否为微信环境
 * @return { Boolean }
 */
export const isWeixinClient = () => {
    // #ifdef H5
    return /MicroMessenger/i.test(navigator.userAgent)
    // #endif
}

/**
 * @description 判断是否为安卓环境
 * @return { Boolean }
 */
export function isAndroid() {
    const u = navigator.userAgent
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}

/**
 * @description 获取当前是什么端
 * @return { Object }
 */

export const getClient = () => {
    //@ts-ignore
    return handleClientEvent({
        // 微信小程序
        MP_WEIXIN: () => ClientEnum['MP_WEIXIN'],
        // 微信公众号
        OA_WEIXIN: () => ClientEnum['OA_WEIXIN'],
        // H5
        H5: () => ClientEnum['H5'],
        // APP
        IOS: () => ClientEnum['IOS'],
        ANDROID: () => ClientEnum['ANDROID'],
        // 其它
        OTHER: () => null
    })
}

// 根据端处理事件
//@ts-ignore
export const handleClientEvent = ({ MP_WEIXIN, OA_WEIXIN, H5, IOS, ANDROID, OTHER }: any) => {
    // #ifdef MP-WEIXIN
    return MP_WEIXIN()
    // #endif

    // #ifdef H5
    return isWeixinClient() ? OA_WEIXIN() : H5()
    // #endif

    // #ifdef APP-PLUS
    const system = uni.getSystemInfoSync()
    if (system.platform == 'ios') {
        return IOS()
    } else {
        return ANDROID()
    }
    // #endif
    return OTHER()
}

export const client = getClient()

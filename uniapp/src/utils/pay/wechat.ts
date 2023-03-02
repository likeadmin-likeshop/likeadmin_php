import { PayStatusEnum } from '@/enums/appEnums'
import { handleClientEvent } from '../client'
//#ifdef H5
import wechatOa from '../wechat'
//#endif
export class Wechat {
    init(name: string, pay: any) {
        pay[name] = this
    }

    async run(options: any) {
        try {
            const res = await handleClientEvent({
                MP_WEIXIN: () => {
                    return new Promise((resolve) => {
                        uni.requestPayment({
                            provider: 'wxpay',
                            ...options,
                            success() {
                                resolve(PayStatusEnum.SUCCESS)
                            },
                            fail() {
                                resolve(PayStatusEnum.FAIL)
                            }
                        })
                    })
                },
                OA_WEIXIN: () => {
                    return new Promise((resolve) => {
                        wechatOa
                            .pay(options)
                            .then(() => {
                                resolve(PayStatusEnum.SUCCESS)
                            })
                            .catch(() => {
                                resolve(PayStatusEnum.FAIL)
                            })
                    })
                },
                H5: () => {
                    return new Promise((resolve) => {
                        window.open(options, '_self')
                        resolve(PayStatusEnum.PENDING)
                    })
                }
            })
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

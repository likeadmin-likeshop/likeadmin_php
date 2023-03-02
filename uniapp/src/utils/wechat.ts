import weixin from 'weixin-js-sdk'
import { getWxCodeUrl, OALogin } from '@/api/account'
import { isAndroid } from './client'
import { wxJsConfig } from '@/api/app'

const wechatOa = {
    getSignLink() {
        if (typeof window.signLink === 'undefined' || window.signLink === '') {
            window.signLink = location.href.split('#')[0]
        }
        return isAndroid() ? location.href.split('#')[0] : window.signLink
    },
    getUrl() {
        getWxCodeUrl().then((res) => {
            location.href = res.url
        })
    },
    config() {
        return new Promise((resolve, reject) => {
            wxJsConfig({
                url: this.getSignLink()
            }).then((res) => {
                weixin.config({
                    ...res,
                    success: () => {
                        resolve('success')
                    },
                    fail: (res: any) => {
                        reject('weixin config is fail')
                    }
                })
            })
        })
    },
    authLogin(code: string) {
        return new Promise((resolve, reject) => {
            OALogin({
                code
            })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    ready() {
        return new Promise((resolve) => {
            weixin.ready(() => {
                resolve('success')
            })
        })
    },
    pay(options: Record<any, any>) {
        return new Promise((resolve, reject) => {
            this.ready()
                .then(() => {
                    weixin.chooseWXPay({
                        timestamp: options.timeStamp,
                        nonceStr: options.nonceStr,
                        package: options.package,
                        signType: options.signType,
                        paySign: options.paySign,
                        success: (res: any) => {
                            if (res.errMsg === 'chooseWXPay:ok') {
                                resolve(res)
                            } else {
                                reject(res.errMsg)
                            }
                        },
                        cancel: (res: any) => {
                            reject(res)
                        },
                        fail: (res: any) => {
                            reject(res)
                        }
                    })
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    share(options: Record<any, any>) {
        this.ready().then(() => {
            const { shareTitle, shareLink, shareImage, shareDesc } = options
            weixin.updateTimelineShareData({
                title: shareTitle, // 分享标题
                link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareImage // 分享图标
            })
            // 发送给好友
            weixin.updateAppMessageShareData({
                title: shareTitle, // 分享标题
                link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareImage, // 分享图标
                desc: shareDesc
            })
            // 发送到tx微博
            weixin.onMenuShareWeibo({
                title: shareTitle, // 分享标题
                link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareImage, // 分享图标
                desc: shareDesc
            })
        })
    },
    getAddress() {
        return new Promise((reslove, reject) => {
            this.ready().then(() => {
                weixin.openAddress({
                    success: (res: any) => {
                        reslove(res)
                    },
                    fail: (res: any) => {
                        reject(res)
                    }
                })
            })
        })
    },
    getLocation() {
        return new Promise((reslove, reject) => {
            this.ready().then(() => {
                weixin.getLocation({
                    type: 'gcj02',
                    success: (res: any) => {
                        reslove(res)
                    },
                    fail: (res: any) => {
                        reject(res)
                    }
                })
            })
        })
    }
}

export default wechatOa

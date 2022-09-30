import weixin from 'weixin-js-sdk'
import { getWxCodeUrl, OALogin } from '@/api/account'
import { useUserStore } from '@/stores/user'
import { isAndroid } from './client'

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
// export function wxOaConfig() {
//     return new Promise((resolve, reject) => {
//         apiJsConfig().then((res) => {
//             console.log(res) //微信配置
//             weixin.config({
//                 debug: false, // 开启调试模式
//                 appId: res.appId, // 必填，公众号的唯一标识
//                 timestamp: res.timestamp, // 必填，生成签名的时间戳
//                 nonceStr: res.nonceStr, // 必填，生成签名的随机串
//                 signature: res.signature, // 必填，签名
//                 jsApiList: res.jsApiList, // 必填，需要使用的JS接口列表
//                 success: () => {
//                     resolve('success')
//                 },
//                 fail: (res: any) => {
//                     reject('weixin config is fail')
//                 }
//             })
//         })
//     })
// }

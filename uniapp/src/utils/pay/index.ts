import { Pay } from './pay'
import { Alipay } from './alipay'
import { Wechat } from './wechat'

// 支付方式
enum PayWayEnum {
    BALANCE = 1,
    WECHAT = 2,
    ALIPAY = 3
}

// 注入微信支付
const wechat = new Wechat()
Pay.inject(PayWayEnum[2], wechat)

// 注入支付宝支付
const alipay = new Alipay()
Pay.inject(PayWayEnum[3], alipay)

const pay = new Pay()
export { pay, PayWayEnum }

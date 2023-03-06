import { Pay } from './pay'
import { Wechat } from './wechat'

// 支付方式
enum PayWayEnum {
    BALANCE = 1,
    WECHAT = 2,
    ALIPAY = 3
}
const wechat = new Wechat()
// 注入微信支付
Pay.inject(PayWayEnum[2], wechat)
const pay = new Pay()
export { pay, PayWayEnum }

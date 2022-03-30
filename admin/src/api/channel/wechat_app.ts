import request from "@/utils/request";
import * as Interface from './wechat_app.d.ts'

/** S 微信小程序设置 **/
// 获取微信小程序设置
export const apiWechatMiniSetting = (): Promise<Interface.WechatMiniSetting_Res> =>
    request.get('/channel.mnp_settings/getConfig')
// 微信小程序设置
export const apiWechatMiniSettingSet = (data: Interface.WechatMiniSetting_Req): Promise<any> =>
    request.post('/channel.mnp_settings/setConfig', data)
/** E 微信小程序设置 **/
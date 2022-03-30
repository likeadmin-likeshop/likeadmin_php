import request from "@/utils/request";
import * as Interface from './channel/app_store.d.ts'

/** S APP设置 **/
// 获取APP设置
export const apiAppSettings = (): Promise<Interface.AppSettings_Res> =>
    request.get('/channel.app_setting/getConfig')
// APP设置
export const apiAppSettingsSet = (data: Interface.AppSettings_Req): Promise<any> =>
    request.post('/channel.app_setting/setConfig', data)
/** E APP设置 **/
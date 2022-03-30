import request from "@/utils/request";

/** S 字节小程序设置 **/
// 获取字节小程序设置
export const apiToutiaoSetting = () =>
    request.get('/toutiao.toutiao_setting/getConfig')
// 字节小程序设置
export const apiToutiaoSettingSet = (data: any) =>
    request.post('/toutiao.toutiao_setting/setConfig', data)
/** E 字节小程序设置 **/
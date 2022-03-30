import request from "@/utils/request";

/** S 微信公众平台设置 **/
// 获取pc设置
export const apiWechatPlatformGet = (): Promise<any> =>
    request.get('/channel.open_setting/getConfig')
	
// pc设置
export const apiWechatPlatformSet = (data: any): Promise<any> =>
    request.post('/channel.open_setting/setConfig', data)
/** E pc设置 **/
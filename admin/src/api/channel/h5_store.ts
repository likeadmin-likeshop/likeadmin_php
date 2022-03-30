import request from "@/utils/request";

/** S H5设置 **/
// 获取H5设置
export const apiH5Settings = (): Promise<any> =>
    request.get('/channel.h5_setting/getConfig')
// H5设置
export const apiH5SettingsSet = (data: any): Promise<any> =>
    request.post('/channel.h5_setting/setConfig', data)
/** E H5设置 **/
/** S 微信小程序设置 **/
export interface WechatMiniSetting_Res {
    name: string,	// 小程序名称
    original_id: string,	// 原始id
    qr_code: string,	// 二维码
    app_id: string,	
    app_secret: string,	
    request_domain: string,	// request合法域名
    socket_domain: string,	// socket合法域名
    upload_file_domain: string,	// uploadFile合法域名
    download_file_domain: string,	// downloadFile合法域名
    udp_domain: string,	// udp合法域名
    business_domain: string, // 业务域名
    url: string,	
    token: string,	
    encoding_aes_key: string,	
    encryption_type: 1 | 2 | 3 , // 消息加密方式 1-明文模式 2-兼容模式 3-安全模式
    data_format: 1 | 2	// 数据格式 1-JSON 2-XML
}

export interface WechatMiniSetting_Req {
    name: string,	// 小程序名称
    original_id: string,	// 原始id
    qr_code: string,	// 二维码
    app_id: string,	
    app_secret: string,	
    token: string,	
    encoding_aes_key: string,	
    encryption_type: 1 | 2 | 3 ,	// 消息加密方式 1-明文模式 2-兼容模式 3-安全模式
    data_format: 1 | 2	// 数据格式 1-JSON 2-XML
}
/** E 微信小程序设置 **/

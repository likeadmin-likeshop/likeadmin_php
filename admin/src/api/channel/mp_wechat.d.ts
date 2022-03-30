import * as Common from '../common.d.ts'
import {apiMpWeChatMenuSave} from "@/api/channel/mp_wechat";

/** S 渠道信息 **/
export interface MPWeChatConfigInfo_Res extends Common.Indexes {
    name: string,                   // 公众号名称
    original_id: string,            // 原始id
    qr_code: string,                // 二维码
    app_id: string,                 // APP ID
    app_secret: string,             // App Secret
    url: string,                    // URL
    token: string,                  // Token
    encoding_aes_key: string,       // Encoding AES Key
    encryption_type: string,        // 消息加密方式: 1-明文模式 2-兼容模式 3-安全模式
    business_domain: string,        // 业务域名
    js_secure_domain: string,       // JS接口安全域名
    web_auth_domain: string,        // 网页授权域名
}

export interface MPWeChatConfigEdit_Req {
    name?: string,                  // 公众号名称
    original_id?: string,           // 原始id
    qr_code?: string,               // 二维码
    app_id: string,                 // APP ID
    app_secret: string,             // App Secret
    token?: string,                 // Token
    encoding_aes_key?: string,      // Encoding AES Key
    encryption_type: string,        // 消息加密方式: 1-明文模式 2-兼容模式 3-安全模式
}

/** E 渠道信息 **/


/** S 菜单配置 **/
export interface MPWeChatMenu {
    name: string,               // 菜单名称
    type: string,               // 菜单类型：click-关键字；view-网页；miniprogram-小程序
    key?: string,               // 关键字
    url?: string,               // 网页URL
    appid?: string,             // 小程序AppID
    pagepath?: string,          // 小程序路径
    sub_button?: Array<MPWeChatMenu>, // 二级菜单
}

export interface MPWeChatMenuSave_Req {
    menu: Array<MPWeChatMenu>
}

/** E 菜单配置 **/
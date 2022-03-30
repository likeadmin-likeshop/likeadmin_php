/** S APP设置 **/
export interface AppSettings_Res {
    ios_download_url:	string,	// 苹果APP下载链接
    android_download_url:	string,	// 安卓APP下载链接
    download_title:	string,	// APP下载引导文案
    app_id:	string,	// 开放平台appid
    app_secret:	string	// 开放平台appSecrets
}

export interface AppSettings_Req {
    ios_download_url:	string,	// 苹果APP下载链接
    android_download_url:	string,	// 安卓APP下载链接
    download_title:	string,	// APP下载引导文案
    app_id:	string,	// 开放平台appid
    app_secret:	string	// 开放平台appSecrets
}
/** E APP设置 **/

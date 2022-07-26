// 本地缓冲key
export enum ECacheKey {
    TOKEN = 'token',
    ACCOUNT = 'account',
    SIDEBAR_STATUS = 'sidebar_status',
    SETTING = 'setting'
}

// 主题类型
export enum EThemeType {
    LIGHT = 'light',
    DARK = 'dark'
}

// 菜单类型
export enum EMenuType {
    CATALOGUE = 'M',
    MENU = 'C',
    BUTTON = 'A'
}

// 存储引擎类型
export enum EStorageType {
    LOCAL = 'local', // 本地
    QINIU = 'qiniu', // 七牛云
    ALIYUN = 'aliyun', // 阿里云OSS
    QCLOUD = 'qcloud' // 腾讯云OSS
}

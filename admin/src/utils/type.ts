// 页面模式
export enum PageMode {
    'ADD' = 'add', // 添加
    'EDIT' = 'edit' // 编辑
}


// 存储引擎类型
export enum storage {
    'LOCAL' = 'local', // 本地
    'QINIU' = 'qiniu', // 七牛云
	'ALIYUN' = 'aliyun', // 阿里云OSS
	'QCLOUD' = 'qcloud', // 腾讯云OSS
}

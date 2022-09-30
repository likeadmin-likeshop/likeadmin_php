export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data   上传资源（图片，视频）
    FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export enum RequestMethodsEnum {
    GET = 'GET',
    POST = 'POST'
}

export enum RequestCodeEnum {
    SUCCESS = 1, //成功
    FAILED = 0, // 失败
    TOKEN_INVALID = -1 // TOKEN参数无效
}

export enum RequestErrMsgEnum {
    ABORT = 'request:fail abort',
    TIMEOUT = 'request:fail timeout'
}

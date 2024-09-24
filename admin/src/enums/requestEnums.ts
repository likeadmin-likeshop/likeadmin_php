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
    NOT_INSTALL = -2,
    LOGIN_FAILURE = -1,
    FAIL = 0,
    SUCCESS = 1,
    OPEN_NEW_PAGE = 2
}

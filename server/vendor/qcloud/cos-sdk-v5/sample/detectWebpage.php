<?php

require dirname(__FILE__, 2) . '/vendor/autoload.php';

$secretId = "SECRETID"; //替换为用户的 secretId，请登录访问管理控制台进行查看和管理，https://console.cloud.tencent.com/cam/capi
$secretKey = "SECRETKEY"; //替换为用户的 secretKey，请登录访问管理控制台进行查看和管理，https://console.cloud.tencent.com/cam/capi
$region = "ap-beijing"; //替换为用户的 region，已创建桶归属的region可以在控制台查看，https://console.cloud.tencent.com/cos5/bucket
$cosClient = new Qcloud\Cos\Client(
    array(
        'region' => $region,
        'schema' => 'https', // 审核时必须为https
        'credentials' => array(
            'secretId' => $secretId,
            'secretKey' => $secretKey)));
try {
    $result = $cosClient->detectWebpage(array(
        'Bucket' => 'examplebucket-125000000', //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.cloud.tencent.com/cos5/bucket
        'Input' => array(
            'Url' => 'https://www.xxx.com/',
//            'DataId' => 'xxx', // 可选 该字段在审核结果中会返回原始内容，长度限制为512字节。您可以使用该字段对待审核的数据进行唯一业务标识。
//            'UserInfo' => array(
//                'TokenId' => '',
//                'Nickname' => '',
//                'DeviceId' => '',
//                'AppId' => '',
//                'Room' => '',
//                'IP' => '',
//                'Type' => '',
//                'ReceiveTokenId' => '',
//                'Gender' => '',
//                'Level' => '',
//                'Role' => '',
//            ), // 可选 用户业务字段
        ),
//        'Conf' => array(
//            'BizType' => 'd7a51676a0xxxxxxxxxxxxxxxxxxxxxx', // 可选 审核策略
////            'DetectType' => 'Porn', // 可选 审核的场景类型 注：该参数后续不再维护，请使用BizType参数
//            'Callback' => 'http://xxx.com/xxx', // 可选 回调地址，以http://或者https://开头的地址。
//            'ReturnHighlightHtml' => 'true', // 可选 true 或者 false 指定是否需要高亮展示网页内的违规文本，查询及回调结果时会根据此参数决定是否返回高亮展示的 html 内容
//            'CallbackType' => 1, // 可选 回调片段类型，有效值：1（回调全部图片和文本片段）、2（回调违规图片和文本片段）。默认为 1。
//        ), // 审核规则配置
    ));
    // 请求成功
    print_r($result);
} catch (\Exception $e) {
    // 请求失败
    echo($e);
}

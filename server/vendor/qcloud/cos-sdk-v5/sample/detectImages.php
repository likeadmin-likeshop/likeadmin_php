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
    // 获取图片base64编码
//    $localImageFile = '/tmp/test.jpg';
//    $img = file_get_contents($localImageFile);
//    $imgInfo = getimagesize($localImageFile);
//    $imgBase64Content = base64_encode($img);

    $result = $cosClient->detectImages(array(
        'Bucket' => 'examplebucket-125000000', //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.cloud.tencent.com/cos5/bucket
        'Inputs' => array(
            array(
                'Object' => 'test01.png', // 桶文件
//                'Interval' => '', // 可选 审核 GIF 时使用 截帧的间隔
//                'MaxFrames' => '', // 可选 针对 GIF 动图审核的最大截帧数量，需大于0。
//                'DataId' => 'aaa', // 可选 图片标识，该字段在结果中返回原始内容，长度限制为512字节
//                'LargeImageDetect' => 1, // 对于超过大小限制的图片是否进行压缩后再审核，取值为： 0（不压缩），1（压缩）。默认为0。注：压缩最大支持32M的图片，且会收取压缩费用
//                'UserInfo' => array(
//                    'TokenId' => '',
//                    'Nickname' => '',
//                    'DeviceId' => '',
//                    'AppId' => '',
//                    'Room' => '',
//                    'IP' => '',
//                    'Type' => '',
//                    'ReceiveTokenId' => '',
//                    'Gender' => '',
//                    'Level' => '',
//                    'Role' => '',
//                ), // 可选 用户业务字段
//                'Encryption' => array(
//                    'Algorithm' => '',
//                    'Key' => '',
//                    'IV' => '',
//                    'KeyId' => '',
//                    'KeyType' => 0,
//                ), // 可选 文件加密信息。如果图片未做加密则不需要使用该字段，如果设置了该字段，则会按设置的信息解密后再做审核。
            ),
            array(
                'Url' => 'http://example.com/test.png', // 图片URL
//                'Interval' => 5, // 可选 审核 GIF 时使用 截帧的间隔
//                'MaxFrames' => 5, // 可选 针对 GIF 动图审核的最大截帧数量，需大于0。
//                'DataId' => 'bbb', // 可选 图片标识，该字段在结果中返回原始内容，长度限制为512字节
//                'LargeImageDetect' => 1, // 对于超过大小限制的图片是否进行压缩后再审核，取值为： 0（不压缩），1（压缩）。默认为0。注：压缩最大支持32M的图片，且会收取压缩费用
//                'UserInfo' => array(
//                    'TokenId' => '',
//                    'Nickname' => '',
//                    'DeviceId' => '',
//                    'AppId' => '',
//                    'Room' => '',
//                    'IP' => '',
//                    'Type' => '',
//                    'ReceiveTokenId' => '',
//                    'Gender' => '',
//                    'Level' => '',
//                    'Role' => '',
//                ), // 可选 用户业务字段
//                'Encryption' => array(
//                    'Algorithm' => '',
//                    'Key' => '',
//                    'IV' => '',
//                    'KeyId' => '',
//                    'KeyType' => 0,
//                ), // 可选 文件加密信息。如果图片未做加密则不需要使用该字段，如果设置了该字段，则会按设置的信息解密后再做审核。
            ),
//            array(
//                'Content' => $imgBase64Content, // 图片文件的内容，需要先经过 base64 编码。注：Content方式提交图片不支持文件加密方式
////                'Interval' => 5, // 可选 审核 GIF 时使用 截帧的间隔
////                'MaxFrames' => 5, // 可选 针对 GIF 动图审核的最大截帧数量，需大于0。
////                'DataId' => 'ccc', // 可选 图片标识，该字段在结果中返回原始内容，长度限制为512字节
//            ),
        ),
//        'Conf' => array(
//            'BizType' => '', // 可选 定制化策略，不传走默认策略
//            'Async' => 0, // 可选 是否异步进行审核，0：同步返回结果，1：异步进行审核。默认值为 0。
//            'Callback' => '', // 可选 审核结果（Detail版本）以回调形式发送至您的回调地址
//            'Freeze' => array(
//                'PornScore' => 90,
//                'AdsScore' => 90,
//                'PoliticsScore' => 90,
//                'TerrorismScore' => 90,
//            ), // 可选 可通过该字段，设置根据审核结果给出的不同分值，对图片进行自动冻结，仅当`input`中审核的图片为`object`时有效。
//        ) // 可选 BizType 不传的情况下，走默认策略及默认审核场景。
    ));
    // 请求成功
    print_r($result);
} catch (\Exception $e) {
    // 请求失败
    echo($e);
}

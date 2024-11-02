<?php

require dirname(__FILE__, 2) . '/vendor/autoload.php';

$secretId = "SECRETID"; //替换为用户的 secretId，请登录访问管理控制台进行查看和管理，https://console.cloud.tencent.com/cam/capi
$secretKey = "SECRETKEY"; //替换为用户的 secretKey，请登录访问管理控制台进行查看和管理，https://console.cloud.tencent.com/cam/capi
$region = "ap-beijing"; //替换为用户的 region，已创建桶归属的region可以在控制台查看，https://console.cloud.tencent.com/cos5/bucket
$cosClient = new Qcloud\Cos\Client(
    array(
        'region' => $region,
        'schema' => 'https', // 万象接口必须使用https
        'credentials'=> array(
            'secretId'  => $secretId,
            'secretKey' => $secretKey)));
try {
    // 创建语音合成模板 https://cloud.tencent.com/document/product/460/84499
    $result = $cosClient->createVoiceTtsTemplate(array(
        'Bucket' => 'examplebucket-125000000', //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.cloud.tencent.com/cos5/bucket
        'Tag' => 'Tts',
        'Name' => 'TemplateName',
        'Mode' => 'Sync',
        'Codec' => 'pcm',
        'VoiceType' => 'aixiaoxing',
        'Volume' => '2',
        'Speed' => '200',
        'Emotion' => 'arousal',
    ));
    // 请求成功
    print_r($result);
} catch (\Exception $e) {
    // 请求失败
    echo($e);
}
